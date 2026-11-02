async (page) => {
  const checks = {}, errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const waitDesk = p => p.locator('main[data-phase=desk][data-world=desk][data-ready=true]').waitFor({timeout:30000});
  const waitWorld = p => p.locator('main[data-phase=workshop][data-world=workshop]').waitFor({timeout:30000});
  const read = p => p.locator('canvas').evaluate(c => ({position:JSON.parse(c.dataset.cameraPosition), target:JSON.parse(c.dataset.cameraTarget), robot:JSON.parse(c.dataset.robotAnimation), frame:Number(c.dataset.renderFrame), world:c.dataset.world}));
  const delta = (a,b) => Math.max(...a.map((v,i) => Math.abs(v-b[i])));
  const assert = (value, message) => {if (!value) throw new Error(message);};

  await page.goto('http://127.0.0.1:4182/hub/'); await waitDesk(page);
  await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
  assert(await page.getByRole('button',{name:'Visit robotics workshop'}).evaluate(b=>b===document.activeElement), 'Tab did not reach robot entry');
  await page.waitForFunction(() => JSON.parse(document.querySelector('canvas').dataset.robotAnimation).waveStarts > 0);
  await page.screenshot({path:'output/playwright/robot-journey/06-keyboard-focus.png'});
  await page.keyboard.press('Enter'); await waitWorld(page);
  await page.keyboard.press('Escape'); await waitDesk(page);
  assert(await page.getByRole('button',{name:'Visit robotics workshop'}).evaluate(b=>b===document.activeElement), 'Keyboard focus did not return');
  checks.keyboardEnterEscape = 'Pass; Tab, authored focus reaction, Enter entry, Escape return and restored focus';
  await page.keyboard.press('Space'); await waitWorld(page);
  await page.getByRole('button',{name:'Back to Desk'}).click(); await waitDesk(page);
  checks.keyboardSpace = 'Pass; second complete round trip';

  // An actual drag changes the invoking view; it must not select the robot.
  await page.mouse.move(900,650); await page.mouse.down(); await page.mouse.move(1080,700,{steps:14}); await page.mouse.up();
  let saved = await read(page), stableFrames = 0;
  for (let i=0;i<100 && stableFrames<3;i++) {
    await page.waitForFunction(frame => Number(document.querySelector('canvas').dataset.renderFrame)>frame,saved.frame);
    const next=await read(page);
    stableFrames=delta(next.position,saved.position)<1e-7?stableFrames+1:0;
    saved=next;
  }
  assert(delta(saved.position,[9.3,7.15,11.4])>0.1, 'Orbit drag did not change view');
  await page.getByRole('button',{name:'Visit robotics workshop'}).click(); await waitWorld(page);
  await page.getByRole('button',{name:'Back to Desk'}).click(); await waitDesk(page);
  await page.waitForTimeout(100); const restored = await read(page);
  assert(delta(saved.position,restored.position)<0.0001 && delta(saved.target,restored.target)<0.0001,JSON.stringify({message:'Orbited pose not restored',saved,restored}));
  checks.orbitedPose = {status:'Pass',saved:saved.position,restored:restored.position,maxError:delta(saved.position,restored.position)};

  // Cancel while flight is active, then wait long enough to expose stale loads.
  await page.getByRole('button',{name:'Visit robotics workshop'}).click();
  await page.locator('main[data-phase=approaching]').waitFor();
  await page.keyboard.press('Escape'); await waitDesk(page);
  await page.waitForTimeout(1200);
  assert(await page.locator('main').getAttribute('data-phase')==='desk','Cancelled entry reopened');
  checks.cancelDuringApproach = 'Pass; Back/Escape cancelled flight and no stale workshop appeared';

  await page.getByRole('button',{name:'Pause motion'}).click();
  await page.waitForFunction(() => {const r=JSON.parse(document.querySelector('canvas').dataset.robotAnimation);return r.reducedMotion && !r.playing && r.action==='Idle';});
  const paused1=await read(page);
  await page.waitForTimeout(350); const paused2=await read(page);
  assert(paused1.robot.idleTime===paused2.robot.idleTime && paused1.robot.waveTime===paused2.robot.waveTime, JSON.stringify({message:'Pause did not freeze authored animation',paused1,paused2}));
  checks.pause = {status:'Pass',frameStart:paused1.frame,frameEnd:paused2.frame,idle:paused2.robot.idleTime};

  const browser=page.context().browser();
  const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,hasTouch:true,isMobile:true,reducedMotion:'no-preference'});
  try {
    const p=await mobile.newPage(); p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:4182/hub/');await waitDesk(p);
    await p.screenshot({path:'output/playwright/robot-journey/07-mobile-desk.png'});
    const point=await p.locator('canvas').evaluate(c=>JSON.parse(c.dataset.robotScreen));
    await p.touchscreen.tap(...point);await waitWorld(p);
    await p.screenshot({path:'output/playwright/robot-journey/08-mobile-workshop.png'});
    await p.getByRole('button',{name:'Back to Desk'}).tap();await waitDesk(p);
    checks.touch = {status:'Pass',viewport:[390,844],input:'emulated touchscreen tap on the actual robot mesh and Back',canvases:await p.locator('canvas').count()};
  } finally {await mobile.close();}

  const still=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
  try {
    const p=await still.newPage();p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:4182/hub/');await waitDesk(p);
    const before=await read(p);
    await p.getByRole('button',{name:'Visit robotics workshop'}).focus();
    await p.waitForTimeout(350); const after=await read(p);
    assert(after.robot.reducedMotion && !after.robot.playing && after.robot.waveStarts===0 && before.robot.idleTime===after.robot.idleTime,'Reduced motion robot animated');
    await p.keyboard.press('Enter');await waitWorld(p);
    await p.screenshot({path:'output/playwright/robot-journey/09-reduced-motion-workshop.png'});
    await p.keyboard.press('Escape');await waitDesk(p);
    checks.reducedMotion = {status:'Pass',frozenIdle:after.robot.idleTime,waveStarts:after.robot.waveStarts,roundTrip:'native Enter / Escape',note:'No animated camera/fade verified separately by coordinator test; browser observed immediate destination and frozen robot'};
  } finally {await still.close();}

  const unavailable=await browser.newContext({viewport:{width:1000,height:800}});
  try {
    const p=await unavailable.newPage();
    // Controlled WebGL failure only in this isolated context, never user settings.
    await p.addInitScript(() => {const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){if(String(kind).startsWith('webgl'))return null;return original.call(this,kind,...args);};});
    await p.goto('http://127.0.0.1:4182/hub/');
    await p.getByRole('alert').filter({hasText:'The workshop is still open.'}).waitFor({timeout:20000});
    await p.screenshot({path:'output/playwright/robot-journey/10-webgl-fallback.png'});
    await p.getByRole('link',{name:'Read robotics notes',exact:true}).click();
    await p.getByRole('heading',{name:'Things that move.'}).waitFor();
    checks.webglUnavailable = 'Pass; controlled context-creation failure shows usable notes/retry links; regular content route works';
  } finally {await unavailable.close();}
  const plain=await browser.newContext({javaScriptEnabled:false});
  try {const p=await plain.newPage();await p.goto('http://127.0.0.1:4182/hub/');await p.getByRole('link',{name:'Read robotics notes',exact:true}).click();await p.getByRole('heading',{name:'Things that move.'}).waitFor();checks.noJavaScript='Pass; noscript link reaches static notes';}finally{await plain.close();}
  assert(errors.length===0,JSON.stringify(errors));
  return {checks,errors,physicalDevices:'Not tested: physical iOS/Android, hardware GPU, Safari/Firefox, screen readers'};
}
