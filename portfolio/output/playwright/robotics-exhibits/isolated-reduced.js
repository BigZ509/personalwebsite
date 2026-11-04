async (page) => {
  const errors=[],messages=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>messages.push({type:m.type(),text:m.text()}));
  const assert=(v,m)=>{if(!v)throw new Error(m);};
  try { await page.locator('main[data-ready=true]').waitFor({timeout:30000}); }
  catch(e) { return {failure:String(e),messages,main:await page.locator('main').innerText()}; }
  assert(await page.locator('main').getAttribute('data-reduced-motion')==='true','Initial reduced motion not honored');
  assert(await page.getByRole('button',{name:'Reduced motion on'}).isDisabled(),'Reduced motion control missing');
  const saved=await page.locator('canvas').getAttribute('data-camera-position');
  const robot=await page.locator('canvas').evaluate(c=>JSON.parse(c.dataset.robotScreen));
  await page.touchscreen.tap(...robot);
  await page.locator('main[data-phase=workshop]').waitFor({timeout:30000});
  const labels=await page.locator('[data-selected]').evaluateAll(es=>es.map(e=>({text:e.innerText,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})));
  assert(labels.length===2 && labels.every(l=>l.left>=12 && l.right<=378),'Labels clipped');
  await page.screenshot({path:'output/playwright/robotics-exhibits/12-reduced-overview.png'});
  await page.touchscreen.tap(112,370);
  assert(await page.getByRole('button',{name:'Gesture Rover',exact:true}).getAttribute('aria-pressed')==='true','Rover touch failed');
  await page.screenshot({path:'output/playwright/robotics-exhibits/13-reduced-rover.png'});
  await page.touchscreen.tap(270,390);
  assert(await page.getByRole('button',{name:'Guiding Hands',exact:true}).getAttribute('aria-pressed')==='true','Hands touch failed');
  const reduced=await page.locator('main').getAttribute('data-reduced-motion');
  await page.screenshot({path:reduced==='true'?'output/playwright/robotics-exhibits/11-reduced-motion.png':'output/playwright/robotics-exhibits/10-mobile-hands-selected.png'});
  await page.getByRole('button',{name:'Back to Desk'}).tap();
  await page.locator('main[data-phase=desk][data-world=desk]').waitFor({timeout:30000});
  await page.waitForFunction(p=>document.querySelector('canvas').dataset.cameraPosition===p,saved);
  assert(await page.locator('canvas').count()===1,'Multiple canvases');
  assert(!errors.length,JSON.stringify(errors));
  return {checks:{meshTouchBoth:'Pass',labelsInBounds:'Pass',touchReturn:'Pass',exactCameraPositionReturn:'Pass'},reducedMotion:reduced,labels,errors,messages,viewport:[390,844]};
}
