export type Pose = { position: [number, number, number]; target: [number, number, number] };
export type World = 'desk' | 'workshop' | 'software';
export type Phase = 'desk' | 'approaching' | 'entering' | 'workshop' | 'software' | 'returning';
export type JourneyPorts = {
  capture: () => Pose;
  move: (pose: Pose, animate: boolean, signal: AbortSignal) => Promise<void>;
  cover: (covered: boolean, animate: boolean, signal: AbortSignal) => Promise<void>;
  show: (world: World, signal: AbortSignal) => Promise<void>;
  lock: (locked: boolean) => void;
  phase: (phase: Phase) => void;
  returned: () => void;
  error: (error: unknown) => void;
};
export const approach: Pose = { position: [4.15, 4.85, 2.8], target: [2.25, 3.94, -0.75] };
export const workshopEntry: Pose = { position: [1.6, 3.7, 3.7], target: [0, 3.1, 0] };
export const workshopOverview: Pose = { position: [6.6, 5.5, 8.1], target: [0, 2.65, -0.3] };

export const destinations = {
  workshop: { approach, entry: workshopEntry, overview: workshopOverview },
  software: {
    approach: { position: [.05, 4.22, 1.7], target: [.05, 4.19, -1.08] } as Pose,
    entry: { position: [0, 3.9, 4.2], target: [0, 3.1, -.4] } as Pose,
    overview: { position: [3.8, 5.6, 10.4], target: [0, 2.8, -.3] } as Pose,
  },
};

// CameraControls and the DOM fade are abortable ports. Racing every await also
// prevents stale React/world-load completions from advancing a cancelled visit.
export function abortable<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const cancel = () => reject(signal.reason ?? new DOMException('Cancelled', 'AbortError'));
    if (signal.aborted) { cancel(); return; }
    signal.addEventListener('abort', cancel, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener('abort', cancel));
  });
}

export function createJourney(ports: JourneyPorts, reduce: () => boolean) {
  let phase: Phase = 'desk';
  let destination: keyof typeof destinations = 'workshop';
  let original: Pose | null = null;
  let current: AbortController | null = null;
  const setPhase = (value: Phase) => { phase = value; ports.phase(value); };
  const start = () => {
    current?.abort();
    current = new AbortController();
    ports.lock(true);
    return current;
  };
  async function run(controller: AbortController, work: (signal: AbortSignal) => Promise<void>) {
    try { await work(controller.signal); }
    catch (error) {
      if (controller.signal.aborted) return;
      ports.error(error);
      // Recovery is bounded by the same abortable ports; no recursive retry.
      try {
        await ports.show('desk', controller.signal);
        if (original) await ports.move(original, false, controller.signal);
        await ports.cover(false, false, controller.signal);
      } catch { /* A lost context uses the semantic fallback. */ }
      if (controller.signal.aborted) return;
      setPhase('desk');
    }
    if (current === controller && !controller.signal.aborted) ports.lock(false);
  }
  return {
    get phase() { return phase; },
    enter(next: keyof typeof destinations = 'workshop') {
      if (phase !== 'desk') return Promise.resolve();
      destination = next;
      const config = destinations[destination];
      original = ports.capture();
      const controller = start(); setPhase('approaching');
      return run(controller, async signal => {
        await abortable(ports.move(config.approach, !reduce(), signal), signal);
        await abortable(ports.cover(true, !reduce(), signal), signal);
        setPhase('entering');
        await abortable(ports.show(destination, signal), signal);
        await abortable(ports.move(config.entry, false, signal), signal);
        await abortable(ports.cover(false, !reduce(), signal), signal);
        await abortable(ports.move(config.overview, !reduce(), signal), signal);
        setPhase(destination);
      });
    },
    back() {
      if (!original || phase === 'desk' || phase === 'returning') return Promise.resolve();
      const controller = start(); setPhase('returning');
      return run(controller, async signal => {
        await abortable(ports.cover(true, !reduce(), signal), signal);
        await abortable(ports.show('desk', signal), signal);
        await abortable(ports.move(destinations[destination].approach, false, signal), signal);
        await abortable(ports.cover(false, !reduce(), signal), signal);
        await abortable(ports.move(original!, !reduce(), signal), signal);
        setPhase('desk'); ports.returned();
      });
    },
    cancel() { current?.abort(); ports.lock(false); },
  };
}
