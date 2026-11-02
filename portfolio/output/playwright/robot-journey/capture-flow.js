async (page) => {
  const errors = [], requests = [], warnings = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => requests.push({url:request.url(), failure:request.failure()}));
  page.on('console', message => { if (message.type() === 'warning') warnings.push(message.text()); });
  await page.goto('http://127.0.0.1:4182/hub/');
  await page.locator('main[data-ready=true]').waitFor({timeout:30000});
  const canvas = await page.locator('canvas').elementHandle();
  const read = () => page.locator('canvas').evaluate(c => ({
    camera: JSON.parse(c.dataset.cameraPosition), target:JSON.parse(c.dataset.cameraTarget),
    robot:JSON.parse(c.dataset.robotAnimation), world:c.dataset.world,
    calls:c.dataset.drawCalls, triangles:c.dataset.triangles, screen:JSON.parse(c.dataset.robotScreen),
  }));
  const initial = await read();
  await page.screenshot({path:'output/playwright/robot-journey/01-desk.png'});
  await page.mouse.move(...initial.screen);
  await page.waitForFunction(() => JSON.parse(document.querySelector('canvas').dataset.robotAnimation).action === 'Wave');
  const reactionStart = await read();
  await page.waitForFunction(() => JSON.parse(document.querySelector('canvas').dataset.robotAnimation).waveTime > 0.35);
  await page.screenshot({path:'output/playwright/robot-journey/02-hover-wave.png'});
  const reactionLater = await read();
  if (reactionLater.robot.waveStarts < 1) throw new Error('No authored Wave triggered');
  if (JSON.stringify(reactionStart.robot.rightHandWorld) === JSON.stringify(reactionLater.robot.rightHandWorld)) throw new Error('Wave hand did not move');
  await page.mouse.click(...initial.screen);
  await page.locator('main[data-phase=approaching]').waitFor();
  await page.waitForFunction(() => JSON.parse(document.querySelector('canvas').dataset.cameraPosition)[0] < 8.8);
  const approaching = await read();
  await page.screenshot({path:'output/playwright/robot-journey/03-camera-approach.png'});
  await page.locator('main[data-phase=workshop]').waitFor({timeout:30000});
  const workshop = await read();
  await page.screenshot({path:'output/playwright/robot-journey/04-workshop.png'});
  if (!await page.getByRole('button',{name:'Back to Desk'}).evaluate(b => b === document.activeElement)) throw new Error('Workshop return did not receive focus');
  await page.getByRole('button',{name:'Back to Desk'}).click();
  await page.locator('main[data-phase=desk][data-world=desk]').waitFor({timeout:30000});
  await page.waitForFunction(() => Math.abs(JSON.parse(document.querySelector('canvas').dataset.cameraPosition)[0] - 9.3) < 0.0001);
  const returned = await read();
  await page.screenshot({path:'output/playwright/robot-journey/05-returned-desk.png'});
  const sameCanvas = await canvas.evaluate(c => c === document.querySelector('canvas'));
  const focusRestored = await page.getByRole('button',{name:'Visit robotics workshop'}).evaluate(b => b === document.activeElement);
  const distance = (a,b) => Math.max(...a.map((value,i) => Math.abs(value-b[i])));
  if (!sameCanvas || !focusRestored || distance(returned.camera,initial.camera)>0.0001 || distance(returned.target,initial.target)>0.0001) throw new Error('Desk restoration failed');
  const environment = await page.evaluate(() => {
    const c=document.querySelector('canvas'), gl=c.getContext('webgl2'), d=gl.getExtension('WEBGL_debug_renderer_info');
    return {renderer:gl.getParameter(d.UNMASKED_RENDERER_WEBGL), userAgent:navigator.userAgent, viewport:[innerWidth,innerHeight], canvases:document.querySelectorAll('canvas').length};
  });
  if (errors.length) throw new Error(JSON.stringify(errors));
  return {environment, initial, reactionStart, reactionLater, approaching, workshop, returned, sameCanvas, focusRestored, errors, requests, warnings};
}
