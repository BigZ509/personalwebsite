import { test, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

test("specimen reveals robotics through click and can reset", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "A curious mind. An engineer at heart." })).toBeVisible();
  const specimen = page.getByRole("button", { name: "Meet the robot. Explore robotics." });
  await specimen.click();
  await expect(specimen).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("heading", { name: "Ideas, out in the real world." })).toBeVisible();
  await page.getByRole("button", { name: "Return to specimen" }).click();
  await expect(specimen).toBeFocused();
  await expect(specimen).toHaveAttribute("aria-expanded", "false");
});

for (const key of ["Enter", "Space"]) {
  test(`keyboard ${key} reveals the section through the native button`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const specimen = page.getByRole("button", { name: "Meet the robot. Explore robotics." });
    await specimen.focus();
    await page.keyboard.press(key);
    await expect(specimen).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("heading", { name: "Ideas, out in the real world." })).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
  });
}

test("reduced motion skips the 3D request and preserves pause preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const models: string[] = [];
  page.on("request", r => { if (r.url().endsWith(".glb")) models.push(r.url()); });
  await page.goto("/");
  await expect(page.getByText("Reduced motion is on.", { exact: false })).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(models).toEqual([]);
});

test("mobile starts static, first touch reveals, no required WebGL", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Enable 3D" })).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Meet the robot. Explore robotics." }).tap();
  await expect(page.getByRole("heading", { name: "Ideas, out in the real world." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await context.close();
});

test("no WebGL falls back without losing navigation", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).startsWith("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.getByText("Static specimen", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Meet the robot. Explore robotics." }).click();
  await expect(page.getByRole("heading", { name: "Ideas, out in the real world." })).toBeVisible();
  await page.getByRole("link", { name: "Robotics", exact: true }).click();
  await expect(page).toHaveURL(/\/robotics\/$/);
});

test("model failure retains the poster and usable specimen", async ({ page }) => {
  await page.route("**/*.glb", route => route.abort());
  await page.goto("/");
  await expect(page.getByText("Static specimen", { exact: true })).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Meet the robot. Explore robotics." }).click();
  await expect(page.getByRole("heading", { name: "Ideas, out in the real world." })).toBeVisible();
});

test("retry recovers from a failed model request", async ({ page }) => {
  await page.route("**/*.glb", route => route.abort());
  await page.goto("/");
  await expect(page.getByText("Static specimen", { exact: true })).toBeVisible({ timeout: 15000 });
  await page.unroute("**/*.glb");
  await page.getByRole("button", { name: "Retry 3D" }).click();
  await expect(page.getByText("Live specimen", { exact: true })).toBeVisible({ timeout: 15000 });
});

test("3D loads once, pause works and a live preference change removes it", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Live specimen", { exact: true })).toBeVisible({ timeout: 20000 });
  await expect(page.locator("canvas")).toHaveCount(1);
  const pause = page.getByRole("button", { name: "Pause motion" });
  await pause.click();
  await expect(page.getByRole("button", { name: "Resume motion" })).toBeVisible();
  await page.waitForTimeout(350);
  const pausedFrame = await page.locator("canvas").getAttribute("data-render-frame");
  await page.waitForTimeout(350);
  await expect(page.locator("canvas")).toHaveAttribute("data-render-frame", pausedFrame!);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByText("Reduced motion is on.", { exact: false })).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.getByRole("button", { name: "Resume motion" })).toBeVisible({ timeout: 15000 });
});

test("actual context loss preserves fallback and reveal", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Live specimen", { exact: true })).toBeVisible({ timeout: 20000 });
  await page.locator("canvas").evaluate(canvas => {
    const gl = (canvas as HTMLCanvasElement).getContext("webgl2");
    if (!gl?.getExtension("WEBGL_lose_context")) throw new Error("Context-loss extension unavailable");
    gl.getExtension("WEBGL_lose_context")!.loseContext();
  });
  await expect(page.getByText("Static specimen", { exact: true })).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Meet the robot. Explore robotics." }).click();
  await expect(page.getByRole("heading", { name: "Ideas, out in the real world." })).toBeVisible();
});

test("offscreen rendering stops and resumes without a second canvas", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Live specimen", { exact: true })).toBeVisible({ timeout: 20000 });
  await page.setViewportSize({ width: 320, height: 320 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const frame = await page.locator("canvas").getAttribute("data-render-frame");
  await page.waitForTimeout(350);
  await expect(page.locator("canvas")).toHaveAttribute("data-render-frame", frame!);
  await page.getByRole("button", { name: "Meet the robot. Explore robotics." }).scrollIntoViewIfNeeded();
  await expect.poll(async () => page.locator("canvas").getAttribute("data-render-frame")).not.toBe(frame);
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("no-JS home and deep route contain useful HTML", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4179/");
  await expect(page.getByRole("heading", { name: "A curious mind. An engineer at heart." })).toBeVisible();
  await page.getByRole("link", { name: "Robotics", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Robotics, in progress." })).toBeVisible();
  await context.close();
});

test("direct robotics route requests no model and unknown paths are 404", async ({ page, request }) => {
  const models: string[] = [];
  page.on("request", r => { if (r.url().endsWith(".glb")) models.push(r.url()); });
  await page.goto("/robotics/");
  await expect(page.getByRole("heading", { name: "Robotics, in progress." })).toBeVisible();
  expect(models).toEqual([]);
  expect((await request.get("/this-page-does-not-exist/")).status()).toBe(404);
});

test("capture prototype review evidence", async ({ page, browser }) => {
  await mkdir("docs/evidence", { recursive: true });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByText("Live specimen", { exact: true })).toBeVisible({ timeout: 20000 });
  await page.getByRole("button", { name: "Pause motion" }).click();
  await page.screenshot({ path: "docs/evidence/homepage-desktop.png", fullPage: true });
  const desktop = await page.evaluate(() => ({
    userAgent: navigator.userAgent,
    viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio },
    navigation: performance.getEntriesByType("navigation").map(entry => entry.toJSON()),
    resources: performance.getEntriesByType("resource").map(entry => entry.toJSON()),
    renderer: document.querySelector("canvas")?.dataset,
  }));
  await page.getByRole("button", { name: "Meet the robot. Explore robotics." }).click();
  await expect(page.getByRole("heading", { name: "Ideas, out in the real world." })).toBeVisible();
  await page.screenshot({ path: "docs/evidence/robotics-reveal.png", fullPage: true });
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await mobileContext.newPage();
  await mobile.goto("http://127.0.0.1:4179/");
  await expect(mobile.getByRole("button", { name: "Enable 3D" })).toBeVisible();
  await mobile.screenshot({ path: "docs/evidence/homepage-mobile.png", fullPage: true });
  const mobileResources = await mobile.evaluate(() => performance.getEntriesByType("resource").map(entry => entry.toJSON()));
  await writeFile("docs/evidence/browser-observations.json", JSON.stringify({ capturedAt: new Date().toISOString(), environment: "Installed headless Chrome with software SwiftShader WebGL. Viewport/touch emulation, not physical devices.", desktop, mobileResources, pageErrors: errors }, null, 2));
  await mobileContext.close();
  expect(errors).toEqual([]);
});
