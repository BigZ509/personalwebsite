import test from 'node:test';
import assert from 'node:assert/strict';
import { createJourney, type Pose, type JourneyPorts } from '../src/features/hub/journey.ts';

// The camera boundary is simulated; the real coordinator owns cancellation and state.
function setup() {
  let pose: Pose = { position: [8, 6, 10], target: [1, 3, 0] };
  let world = 'desk';
  let locked = false;
  let returned = 0;
  const errors: unknown[] = [];
  const animated: boolean[] = [];
  const ports: JourneyPorts = {
    capture: () => structuredClone(pose),
    move: async (next, animate) => { pose = structuredClone(next); animated.push(animate); },
    cover: async (_covered, animate) => { animated.push(animate); },
    show: async next => { world = next; },
    lock: value => { locked = value; },
    phase: () => {},
    returned: () => { returned++; },
    error: error => { errors.push(error); },
  };
  return { ports, state: () => ({ pose, world, locked, returned, errors, animated }) };
}

test('return restores the actual invoking camera pose, including an orbited view', async () => {
  const f = setup(); const journey = createJourney(f.ports, () => false);
  await journey.enter();
  assert.equal(f.state().world, 'workshop');
  await journey.back();
  assert.deepEqual(f.state().pose, { position: [8, 6, 10], target: [1, 3, 0] });
  assert.equal(f.state().world, 'desk'); assert.equal(f.state().locked, false);
  assert.equal(f.state().returned, 1);
});

test('Back during approach prevents a stale camera completion from reopening the workshop', async () => {
  const f = setup(); let complete!: () => void; let first = true;
  const normalMove = f.ports.move;
  f.ports.move = async (...args) => {
    if (first) { first = false; await new Promise<void>(resolve => { complete = resolve; }); }
    if (!args[2].aborted) return normalMove(...args);
  };
  const journey = createJourney(f.ports, () => false);
  const entering = journey.enter();
  const returning = journey.back();
  complete();
  await Promise.all([entering, returning]);
  assert.equal(journey.phase, 'desk'); assert.equal(f.state().world, 'desk');
  assert.deepEqual(f.state().pose.position, [8, 6, 10]);
});

test('reduced motion reaches both destinations without animated camera moves or fades', async () => {
  const f = setup(); const journey = createJourney(f.ports, () => true);
  await journey.enter(); await journey.back();
  assert.ok(f.state().animated.length > 0);
  assert.ok(f.state().animated.every(value => value === false));
  assert.equal(f.state().returned, 1);
});

test('a failed workshop load recovers the desk pose and releases controls', async () => {
  const f = setup();
  f.ports.show = async world => { if (world === 'workshop') throw new Error('load failed'); };
  const journey = createJourney(f.ports, () => false);
  await journey.enter();
  assert.equal(journey.phase, 'desk'); assert.equal(f.state().locked, false);
  assert.deepEqual(f.state().pose.position, [8, 6, 10]);
  assert.equal(f.state().errors.length, 1);
});

test('turning on reduced motion during approach makes all later stages immediate', async () => {
  const f = setup(); let reduced = false; let complete!: () => void;
  const move = f.ports.move;
  let first = true;
  f.ports.move = async (...args) => {
    if (first) { first = false; await new Promise<void>(resolve => { complete = resolve; }); }
    return move(...args);
  };
  const journey = createJourney(f.ports, () => reduced);
  const entry = journey.enter(); reduced = true; complete(); await entry;
  assert.deepEqual(f.state().animated, [true, false, false, false, false]);
});
