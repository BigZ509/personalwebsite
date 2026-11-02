async (page) => {
  const errors = [];
  const failedRequests = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("requestfailed", request => failedRequests.push({url:request.url(),failure:request.failure()}));
  const base = "http://127.0.0.1:4182/compositions/";
  const results = {environment:"Isolated Chrome, software WebGL/SwiftShader",viewport:{width:1600,height:1100},views:[],checks:{},errors,failedRequests};
  for (const view of ["cozy", "cinematic", "stylized-game"]) {
    await page.goto(`${base}?view=${view}&clean=1`);
    await page.locator(`main[data-composition="${view}"][data-scene-ready=true]`).waitFor({timeout:30000});
    const evidence = await page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      const gl = canvas.getContext("webgl2");
      const debug = gl.getExtension("WEBGL_debug_renderer_info");
      return {canvases:document.querySelectorAll("canvas").length,assets:canvas.dataset.loadedAssets,drawCalls:canvas.dataset.drawCalls,triangles:canvas.dataset.triangles,renderer:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),width:canvas.width,height:canvas.height};
    });
    if (evidence.canvases !== 1) throw new Error("Expected exactly one canvas");
    for (const file of ["robot-expressive.glb", "basketball.glb", "camera.glb", "chip.glb", "monitor.glb", "lamp.glb"]) if (!evidence.assets.includes(file)) throw new Error(`Missing asset ${file}`);
    await page.screenshot({path:`output/playwright/compositions/${view}.png`});
    results.views.push({view,...evidence,screenshot:`output/playwright/compositions/${view}.png`});
  }
  await page.goto(base);
  await page.locator("main[data-scene-ready=true]").waitFor({timeout:30000});
  await page.getByRole("button",{name:/Cinematic/}).click();
  await page.locator('main[data-composition="cinematic"][data-scene-ready=true]').waitFor();
  if (await page.getByRole("button",{name:/Cinematic/}).getAttribute("aria-pressed") !== "true") throw new Error("Cinematic control did not select");
  results.checks.modeButtonClick = "Pass; selected actual cinematic scene, one canvas";
  await page.getByRole("button",{name:/Stylized game/}).focus();
  await page.keyboard.press("Enter");
  await page.locator('main[data-composition="stylized-game"][data-scene-ready=true]').waitFor();
  results.checks.modeKeyboardEnter = "Pass; selected actual orthographic scene";
  await page.getByRole("button",{name:/Cozy/}).focus();
  await page.keyboard.press("Space");
  await page.locator('main[data-composition="cozy"][data-scene-ready=true]').waitFor();
  results.checks.modeKeyboardSpace = "Pass; returned to cozy";
  await page.getByRole("button",{name:"Inspect Software object"}).focus();
  await page.getByRole("status").filter({hasText:"Software"}).waitFor();
  await page.screenshot({path:"output/playwright/compositions/keyboard-focus-software.png"});
  results.checks.objectKeyboardFocus = "Pass; Software label and rendered selection ring captured";
  await page.getByRole("button",{name:"Reset view"}).click();
  await page.screenshot({path:"output/playwright/compositions/study-controls.png"});
  results.checks.resetView = "Pass; reset control exercised";
  results.checks.miniWorlds = "Not implemented; outside authorized scope";
  results.checks.physicalDevices = "Not tested";
  if (errors.length) throw new Error(JSON.stringify({errors,failedRequests}));
  return results;
}
