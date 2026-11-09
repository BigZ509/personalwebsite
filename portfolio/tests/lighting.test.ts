import test from 'node:test';
import assert from 'node:assert/strict';
import { cycleLamp, lightingTargets, lampTarget, blendStep } from '../src/features/hub/lighting.ts';

test('lamp cycles Off, Warm, Cool independently of environment', () => {
  assert.equal(cycleLamp('off'), 'warm'); assert.equal(cycleLamp('warm'), 'cool'); assert.equal(cycleLamp('cool'), 'off');
  for (const mode of ['off', 'warm', 'cool'] as const) {
    const lamp = lampTarget(mode, 65);
    lightingTargets('day', 'desk'); lightingTargets('night', 'software');
    assert.deepEqual(lampTarget(mode, 65), lamp);
    assert.equal(lamp.intensity === 0, mode === 'off');
  }
});
test('night desk and robotics retain their key lighting; daylight brightens the studio while software stays cooler', () => {
  const desk = lightingTargets('night', 'desk');
  assert.equal(desk.ambientIntensity, .8); assert.equal(desk.keyIntensity, 2.1);
  assert.deepEqual(lightingTargets('night', 'workshop'), desk);
  assert.notEqual(lightingTargets('night', 'software').key, desk.key);
  const sunlitDesk = lightingTargets('day', 'desk');
  assert.ok(sunlitDesk.ambientIntensity > desk.ambientIntensity);
  assert.equal(sunlitDesk.background, '#c5d3d0');
  assert.equal(sunlitDesk.key, '#fff0d5');
  assert.equal(lightingTargets('day', 'workshop').background, sunlitDesk.background);
  assert.equal(lightingTargets('day', 'software').background, '#668690');
});
test('interpolation is monotonic, bounded and independent of frame rate', () => {
  const one = blendStep(0, 10, 1); let many = 0;
  for (let n = 0; n < 60; n++) many = blendStep(many, 10, 1 / 60);
  assert.ok(Math.abs(one - many) < .00001);
  assert.ok(one > 0 && one < 10);
  assert.equal(blendStep(0, 10, 0), 0);
});
