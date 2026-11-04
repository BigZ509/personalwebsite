async(page)=>{
 const errors=[],failed=[];page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>failed.push(r.url()));const assert=(v,m)=>{if(!v)throw new Error(m);};
 await page.locator('main[data-ready=true]').waitFor({timeout:30000});const reduced=await page.locator('main').getAttribute('data-reduced-motion'),prefix=reduced==='true'?'reduced':'mobile';
 const canvas=await page.locator('canvas').elementHandle();const original=await page.locator('canvas').getAttribute('data-camera-position');const robot=await page.locator('canvas').evaluate(c=>JSON.parse(c.dataset.robotScreen));
 await page.touchscreen.tap(...robot);await page.locator('main[data-phase=workshop]').waitFor({timeout:30000});
 await page.waitForFunction(()=>{const e=[...document.querySelectorAll('[data-selected]')].find(e=>e.querySelector('strong')?.textContent==='Guiding Hands'),r=e?.getBoundingClientRect();return r&&r.left>=4&&r.right<=386&&JSON.parse(document.querySelector('canvas').dataset.cameraPosition).every((v,i)=>Math.abs(v-[6.6,5.5,8.1][i])<0.000001);});
 await page.screenshot({path:`output/playwright/guiding-hardware/${prefix}-01-workshop.png`});
 const labels=await page.locator('[data-selected]').evaluateAll(es=>es.map(e=>({text:e.innerText,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})));
 assert(labels.every(l=>l.left>=4&&l.right<=386),'Mobile labels clipped');
 const guidingRect=await page.locator('[data-selected]').filter({has:page.locator('strong',{hasText:'Guiding Hands'})}).boundingBox();assert(guidingRect.y>440,'Label covers Jetson front edge');
 // Targets are calibrated from the actual rendered desktop objects and portrait screenshot.
 for(const [name,x,y] of [['webcam',201,414],['Jetson',235,424],['projector',293,420]]){
  await page.touchscreen.tap(x,y);const panel=page.getByRole('dialog',{name:'Guiding Hands'});await panel.waitFor();
  assert((await panel.innerText()).includes('not an official NVIDIA model'),'Honesty note missing');
  assert(await panel.getByText('Illustrative setup',{exact:true}).count()===1,'Incorrect representation');
  assert(await panel.getByText('No demo video provided yet.',{exact:true}).count()===1,'Demo invented');
  const rect=await panel.boundingBox();assert(rect.height<=844*.55&&rect.y>844*.4,'Room obscured by mobile sheet');
  if(name==='projector')await page.screenshot({path:`output/playwright/guiding-hardware/${prefix}-02-guiding-panel.png`});
  await panel.getByRole('button',{name:'Close project details'}).tap();
  const control=page.getByRole('group',{name:'Select a project exhibit'}).getByRole('button',{name:'Guiding Hands',exact:true});
  assert(await control.evaluate(e=>e===document.activeElement),'Mobile close focus lost');
 }
 await page.touchscreen.tap(112,370);await page.getByRole('dialog',{name:'Gesture Rover'}).waitFor();
 assert(await page.getByRole('dialog').getByText('Placeholder model',{exact:true}).count()===1,'Rover representation changed');
 await page.getByRole('dialog').getByRole('button',{name:'Guiding Hands',exact:true}).tap();const panel=page.getByRole('dialog',{name:'Guiding Hands'});await panel.waitFor();
 assert(await panel.getByRole('link',{name:'View repository'}).getAttribute('href')==='https://github.com/BigZ509/guiding-hands','Repo changed');
 const body=panel.getByRole('region',{name:'Guiding Hands details'});await body.evaluate(e=>{e.scrollTop=e.scrollHeight;});
 await page.screenshot({path:`output/playwright/guiding-hardware/${prefix}-03-details-scrolled.png`});
 await panel.getByRole('button',{name:'Gesture Rover',exact:true}).tap();assert(await page.getByRole('region',{name:'Gesture Rover details'}).evaluate(e=>e.scrollTop)===0,'Scroll reset regressed');
 await page.getByRole('button',{name:'Back to Desk'}).tap();await page.locator('main[data-phase=desk][data-world=desk]').waitFor({timeout:30000});await page.waitForFunction(p=>document.querySelector('canvas').dataset.cameraPosition===p,original);
 assert(await canvas.evaluate(c=>c===document.querySelector('canvas')),'Canvas replaced');assert(await page.getByRole('dialog').count()===0,'Panel persisted');assert(!errors.length,JSON.stringify(errors));assert(!failed.length,JSON.stringify(failed));
 return{checks:{threeHardwareMeshesTouch:'Pass',illustrativeLabelsAndNote:'Pass',mobileLabelsRoomAndPanel:'Pass',roverAndDataPreserved:'Pass',switchScrollCloseFocus:'Pass',sameCanvasDeskReturn:'Pass'},reducedMotion:reduced,viewport:[390,844],labels,errors,failed};
}
