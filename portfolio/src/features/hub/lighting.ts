export type EnvironmentMode = 'day' | 'night';
export type LampMode = 'off' | 'warm' | 'cool';
export type LightingState = { environment: EnvironmentMode; lamp: LampMode };
export function cycleLamp(mode: LampMode): LampMode { return mode === 'off' ? 'warm' : mode === 'warm' ? 'cool' : 'off'; }
export function lampTarget(mode: LampMode, intensity: number) {
  return { color: mode === 'cool' ? '#c0e0ff' : '#ffd38d', intensity: mode === 'off' ? 0 : intensity, emission: mode === 'off' ? 0 : .7 };
}
export function lightingTargets(environment: EnvironmentMode, world: 'desk' | 'workshop' | 'software') {
  const software = world === 'software';
  return environment === 'day' ? {
    ambient: software ? '#c0d8e4' : '#eee5d3', ambientIntensity: 1.15,
    key: software ? '#deebff' : '#fff0d5', keyIntensity: 4.2,
    fill: software ? '#b8d6e5' : '#c9ddec', fillIntensity: software ? 1.25 : 1.8,
    background: software ? '#668690' : '#c5d3d0', hemisphere: .85,
  } : {
    ambient: software ? '#93bddb' : '#8eb9d0', ambientIntensity: .8,
    key: software ? '#b4d2ee' : '#ffc17c', keyIntensity: 2.1,
    fill: '#83c8e8', fillIntensity: 2.3, background: software ? '#182d40' : '#162d3a', hemisphere: .6,
  };
}
// Exponential smoothing: stable even when the demand renderer skips frames.
export function blendStep(current: number, target: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-5 * Math.max(0, delta)));
}
