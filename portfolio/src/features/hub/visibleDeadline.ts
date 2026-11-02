// Count only foreground time: background RAF suspension is not a load failure.
// Returns cleanup for success, supersession and unmount.
export function visibleDeadline(callback: () => void, milliseconds: number) {
  let remaining = milliseconds;
  let started = performance.now();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let disposed = false;
  const clear = () => { if (timer !== undefined) clearTimeout(timer); timer = undefined; };
  const update = () => {
    if (disposed) return;
    if (document.hidden) {
      if (timer !== undefined) remaining -= performance.now() - started;
      clear();
    } else if (timer === undefined) {
      started = performance.now();
      timer = setTimeout(() => { cleanup(); callback(); }, Math.max(0, remaining));
    }
  };
  const cleanup = () => { disposed = true; clear(); document.removeEventListener("visibilitychange", update); };
  document.addEventListener("visibilitychange", update);
  update();
  return cleanup;
}
