async(page)=>{
 const errors=[],failed=[],warnings=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='warning')warnings.push(m.text());});
 const assert=(v,m)=>{if(!v)throw new Error(m);};
 const read=()=>page.locator('canvas').evaluate(c=>({position:JSON.parse(c.dataset.cameraPosition),target:JSON.parse(c.dataset.cameraTarget)}));
 await page.goto('http://127.0.0.1:4182/hub/');await page.locator('main[data-ready=true]').waitFor({timeout:30000});page.on('requestfailed',r=>failed.push({url:r.url(),failure:r.failure()}));
 const canvas=await page.locator('canvas').elementHandle(),desk=await read();
 await page.screenshot({path:'output/playwright/guiding-hardware/01-desk.png'});
 const robot=await page.locator('canvas').evaluate(c=>JSON.parse(c.dataset.robotScreen));await page.mouse.click(...robot);await page.locator('main[data-phase=workshop]').waitFor({timeout:30000});const workshop=await read();
 await page.screenshot({path:'output/playwright/guiding-hardware/02-workshop.png'});
 await page.screenshot({path:'output/playwright/guiding-hardware/03-hardware-crop.png',clip:{x:740,y:480,width:510,height:235}});
 const loaded=await page.locator('canvas').getAttribute('data-loaded-assets');
 for(const file of ['webcam','projector','office_plant','paper_stack'])assert(loaded.includes(`/models/guiding-hardware/${file}.glb`),`${file} missing`);
 const targets=[['webcam',817,525],['Jetson',919,557],['projector',1090,543]];
 for(const [name,x,y] of targets){
  await page.mouse.move(x,y);await page.waitForFunction(()=>document.querySelector('[data-attention=true] strong')?.textContent==='Guiding Hands');
  await page.mouse.click(x,y);const panel=page.getByRole('dialog',{name:'Guiding Hands'});await panel.waitFor();
  assert(await panel.getByText('Illustrative setup',{exact:true}).count()===1,`${name} representation missing`);
  assert((await panel.innerText()).includes('not an official NVIDIA model'),'Official-model disclaimer missing');
  assert(await panel.getByRole('link',{name:'View repository'}).getAttribute('href')==='https://github.com/BigZ509/guiding-hands','Repo changed');
  assert(await panel.getByText('No demo video provided yet.',{exact:true}).count()===1,'Fake demo');
  assert(await page.locator('video,iframe').count()===0,'Unexpected media');
  const current=await read();assert(JSON.stringify(current)===JSON.stringify(workshop),'Hardware click moved camera');
  if(name==='projector')await page.screenshot({path:'output/playwright/guiding-hardware/04-guiding-panel.png'});
  await page.keyboard.press('Escape');assert(await page.getByRole('dialog').count()===0,'Escape failed to close');
 }
 await page.mouse.click(560,410);await page.getByRole('dialog',{name:'Gesture Rover'}).waitFor();
 assert(await page.getByRole('dialog').getByText('Placeholder model',{exact:true}).count()===1,'Rover placeholder changed');
 assert(await page.getByRole('dialog').getByText('Provisional description',{exact:true}).count()===1,'Rover provisional data changed');
 await page.getByRole('dialog').getByRole('button',{name:'Guiding Hands',exact:true}).click();await page.getByRole('dialog',{name:'Guiding Hands'}).waitFor();
 await page.getByRole('button',{name:'Close project details'}).click();
 const controls=page.getByRole('group',{name:'Select a project exhibit'});
 assert(await controls.getByRole('button',{name:'Guiding Hands',exact:true}).evaluate(e=>e===document.activeElement),'Close focus lost');
 await page.keyboard.press('Space');await page.getByRole('dialog',{name:'Guiding Hands'}).waitFor();await page.keyboard.press('Escape');
 await controls.getByRole('button',{name:'Gesture Rover',exact:true}).focus();await page.keyboard.press('Enter');await page.getByRole('dialog',{name:'Gesture Rover'}).waitFor();
 await page.getByRole('button',{name:'Back to Desk'}).click();await page.locator('main[data-phase=desk][data-world=desk]').waitFor({timeout:30000});
 await page.waitForFunction(p=>{const c=document.querySelector('canvas');return c.dataset.cameraPosition===JSON.stringify(p.position)&&c.dataset.cameraTarget===JSON.stringify(p.target);},desk);
 assert(await canvas.evaluate(c=>c===document.querySelector('canvas')),'Canvas replaced');assert(await page.getByRole('dialog').count()===0,'Panel leaked to desk');
 await page.screenshot({path:'output/playwright/guiding-hardware/05-returned-desk.png'});
 assert(!errors.length,JSON.stringify(errors));assert(!failed.length,JSON.stringify(failed));
 const environment=await page.locator('canvas').evaluate(c=>{const gl=c.getContext('webgl2'),d=gl.getExtension('WEBGL_debug_renderer_info');return{renderer:gl.getParameter(d.UNMASKED_RENDERER_WEBGL),userAgent:navigator.userAgent,viewport:[innerWidth,innerHeight],canvases:document.querySelectorAll('canvas').length};});
 return{checks:{fourAssetsRendered:'Pass',webcamJetsonProjectorActualMeshClicks:'Pass',illustrativeRepresentation:'Pass',confirmedDataAndUnavailableDemos:'Pass',roverPreserved:'Pass',panelSwitchCloseFocus:'Pass',keyboardEnterSpace:'Pass',sameCanvasCameraAndDeskReturn:'Pass'},desk,workshop,loaded,environment,errors,failed,warnings};
}
