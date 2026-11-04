async (page) => {
  const assert=(v,m)=>{if(!v)throw new Error(m);};
  const browser=page.context().browser();
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  let p=await context.newPage();
  await p.bringToFront(); await p.goto('http://127.0.0.1:4182/hub/');
  await p.locator('main[data-ready=true]').waitFor({timeout:30000});
  const original=await p.locator('canvas').getAttribute('data-camera-position');
  const robot=await p.locator('canvas').evaluate(c=>JSON.parse(c.dataset.robotScreen));
  await p.touchscreen.tap(...robot);
  await p.locator('main[data-phase=workshop]').waitFor({timeout:30000});
  await p.screenshot({path:'output/playwright/robotics-exhibits/08-mobile-workshop.png'});
  const errors=[]; p.on('pageerror',e=>errors.push(e.message));
  const controls=name=>p.getByRole('button',{name,exact:true});
  await p.locator('main[data-phase=workshop]').waitFor();
  const labels=await p.locator('[data-selected]').evaluateAll(es=>es.map(e=>({text:e.innerText,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})));
  assert(labels.length===2 && labels.every(l=>l.left>=12 && l.right<=378),'Mobile project labels clipped');
  await p.touchscreen.tap(112,370);
  assert(await controls('Gesture Rover').getAttribute('aria-pressed')==='true','Touch on robot mesh did not select Rover');
  await p.screenshot({path:'output/playwright/robotics-exhibits/09-mobile-rover-selected.png'});
  await p.touchscreen.tap(270,390);
  assert(await controls('Guiding Hands').getAttribute('aria-pressed')==='true','Touch on monitor mesh did not select Hands');
  await p.screenshot({path:'output/playwright/robotics-exhibits/10-mobile-hands-selected.png'});
  await p.getByRole('button',{name:'Back to Desk'}).tap();
  await p.locator('main[data-phase=desk][data-world=desk]').waitFor({timeout:30000});
  await p.waitForFunction(saved=>document.querySelector('canvas').dataset.cameraPosition===saved,original);
  const saved=await p.locator('canvas').getAttribute('data-camera-position');
  await context.close();
  const reduced=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  p=await reduced.newPage(); await p.bringToFront();
  const reducedMessages=[];p.on('console',m=>reducedMessages.push({type:m.type(),text:m.text()}));
  p.on('pageerror',e=>errors.push(e.message));
  // A fresh load honors initial reduced motion; only immediate camera placements.
  await p.goto('http://127.0.0.1:4182/hub/');
  try { await p.locator('main[data-ready=true][data-reduced-motion=true]').waitFor({timeout:30000}); }
  catch(e) { return {failure:String(e),reducedMessages,main:await p.locator('main').innerText(),normalMobileChecks:'Touch meshes, names, labels, normal return passed'}; }
  await p.getByRole('button',{name:'Visit robotics workshop'}).tap();
  await p.locator('main[data-phase=workshop]').waitFor({timeout:30000});
  assert(await p.getByRole('button',{name:'Reduced motion on'}).isDisabled(),'Reduced motion preference missing');
  await p.touchscreen.tap(112,370);
  assert(await controls('Gesture Rover').getAttribute('aria-pressed')==='true','Reduced-motion Rover selection failed');
  await p.touchscreen.tap(270,390);
  assert(await controls('Guiding Hands').getAttribute('aria-pressed')==='true','Reduced-motion Hands selection failed');
  await p.screenshot({path:'output/playwright/robotics-exhibits/11-reduced-motion.png'});
  await p.getByRole('button',{name:'Back to Desk'}).tap();
  await p.locator('main[data-phase=desk][data-world=desk]').waitFor({timeout:30000});
  await p.waitForFunction(saved=>document.querySelector('canvas').dataset.cameraPosition===saved,saved);
  const returned=await p.locator('canvas').getAttribute('data-camera-position');
  assert(saved===returned,'Mobile camera pose changed');
  assert(await p.locator('canvas').count()===1,'Multiple mobile canvases');
  assert(!errors.length,JSON.stringify(errors));
  await reduced.close();
  return {checks:{mobileLabelsInBounds:'Pass',touchMeshSelectionBoth:'Pass',touchReturn:'Pass',initialReducedMotion:'Pass',reducedMotionTouchBoth:'Pass',mobilePoseRestoration:'Pass'},labels,viewport:[390,844],errors,limits:'Desktop Chrome touch emulation; no physical device coverage'};
}
