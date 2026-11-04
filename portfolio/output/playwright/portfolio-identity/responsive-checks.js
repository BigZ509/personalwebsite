async page => {
 const assert=(v,m)=>{if(!v)throw new Error(m);};
 const browser=page.context().browser(),out='output/playwright/portfolio-identity/',results=[];
 for(const extra of browser.contexts())if(extra!==page.context())await extra.close();
 for(const reduced of [false,true]){
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:reduced?'reduce':'no-preference'});
  const p=await context.newPage(),errors=[],failed=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://127.0.0.1:4184/hub/',{waitUntil:'networkidle'});await p.locator('main[data-ready=true]').waitFor({timeout:30000});p.on('requestfailed',r=>failed.push(r.url()));
  const prefix=reduced?'reduced':'mobile',canvas=await p.locator('canvas').elementHandle();const pose=()=>p.locator('canvas').evaluate(c=>({position:c.dataset.cameraPosition,target:c.dataset.cameraTarget}));const desk=await pose();
  const nav=p.getByRole('navigation',{name:'Personal navigation'});await p.screenshot({path:out+prefix+'-01-desk.png'});
  const bounds=await nav.evaluate(n=>{const b=n.getBoundingClientRect();return{left:b.left,right:b.right,bottom:b.bottom,width:innerWidth};});assert(bounds.left>=0&&bounds.right<=bounds.width,'Mobile nav clipping');
  await nav.getByRole('button',{name:'About',exact:true}).tap();const about=p.getByRole('dialog',{name:'About Marc'});await about.waitFor();await p.screenshot({path:out+prefix+'-02-about.png'});await about.getByRole('button',{name:'Close',exact:true}).tap();
  await nav.getByRole('button',{name:'Resume',exact:true}).tap();const resume=p.getByRole('dialog',{name:'Resume',exact:true});await resume.waitFor();assert((await resume.innerText()).includes('isn’t available'),'Mobile resume missing');await p.keyboard.press('Escape');
  const robot=JSON.parse(await p.locator('canvas').getAttribute('data-robot-screen'));await p.touchscreen.tap(...robot);await p.locator('main[data-phase=workshop]').waitFor({timeout:30000});await p.screenshot({path:out+prefix+'-03-workshop.png'});
  assert(await nav.isVisible(),'Mobile workshop identity missing');
  for(const [name,x,y] of [['Rover',114,377],['Guiding',277,376]]){await p.touchscreen.tap(x,y);await p.getByRole('dialog',{name:name==='Rover'?'Gesture Rover':'Guiding Hands',exact:true}).waitFor();await p.getByRole('button',{name:'Close project details'}).tap();}
  await nav.getByRole('button',{name:'About',exact:true}).tap();await about.waitFor();await p.keyboard.press('Escape');assert(await p.locator('main').getAttribute('data-phase')==='workshop','Mobile About Escape returned Desk');
  await p.getByRole('button',{name:'Back to Desk'}).tap();await p.locator('main[data-phase=desk]').waitFor({timeout:30000});await p.waitForFunction(d=>{const c=document.querySelector('canvas');return c.dataset.cameraPosition===d.position&&c.dataset.cameraTarget===d.target;},desk);assert(await canvas.evaluate(c=>c===document.querySelector('canvas')),'Mobile canvas replaced');
  assert(await p.locator('main').getAttribute('data-reduced-motion')===(reduced?'true':'false'),'Motion preference lost');
  assert(!errors.length,JSON.stringify(errors));assert(!failed.length,JSON.stringify(failed));results.push({mode:prefix,checks:'Pass: name/nav bounds, About/Resume touch, robot and both project mesh taps, modal Escape, exact return/same Canvas',viewport:[390,844],desk,bounds,errors,failed});await context.close();
 }
 await page.goto('http://127.0.0.1:4184/hub/',{waitUntil:'networkidle'});await page.locator('main[data-ready=true]').waitFor({timeout:30000});
 const layout=[];
 for(const size of [{width:740,height:360},{width:800,height:360},{width:320,height:568}]){
  await page.setViewportSize(size);await page.waitForTimeout(250);await page.screenshot({path:out+`layout-${size.width}x${size.height}-desk.png`});
  const measurements=await page.evaluate(()=>{const nav=document.querySelector('nav[aria-label="Personal navigation"]').getBoundingClientRect(),controls=document.querySelector('[aria-label="Workroom controls"]').getBoundingClientRect(),intro=document.querySelector('[aria-label="Desk navigation"]').getBoundingClientRect();return{nav:{top:nav.top,bottom:nav.bottom,left:nav.left,right:nav.right},controls:{top:controls.top,bottom:controls.bottom},caption:{top:intro.top,bottom:intro.bottom},width:innerWidth,height:innerHeight};});
  assert(measurements.nav.right<=size.width&&measurements.nav.left>=0,'Nav overflow '+size.width);assert(measurements.controls.top>=measurements.nav.bottom,'Nav and scene controls overlap '+size.width);assert(measurements.caption.top>=measurements.controls.bottom,'Desk caption overlaps utilities '+size.width);
  await page.getByRole('button',{name:'Visit robotics workshop'}).click();await page.locator('main[data-phase=workshop]').waitFor({timeout:30000});await page.screenshot({path:out+`layout-${size.width}x${size.height}-workshop.png`});
  const caption=await page.getByRole('region',{name:'Project exhibits'}).boundingBox();assert(caption.y>=measurements.controls.bottom,'Workshop caption overlaps utilities '+size.width);
  await page.getByRole('button',{name:'Back to Desk'}).click();await page.locator('main[data-phase=desk]').waitFor({timeout:30000});layout.push({viewport:size,measurements,workshopCaption:caption,result:'Pass'});
 }
 return{touchAndInitialReduced:results,layout};
}
