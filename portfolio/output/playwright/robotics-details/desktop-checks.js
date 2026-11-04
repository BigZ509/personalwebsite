async(page)=>{
 const errors=[],requests=[],warnings=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));page.on('console',m=>{if(m.type()==='warning')warnings.push(m.text());});
 const assert=(v,m)=>{if(!v)throw new Error(m);};
 const state=()=>page.locator('canvas').evaluate(c=>({position:JSON.parse(c.dataset.cameraPosition),target:JSON.parse(c.dataset.cameraTarget),frame:c.dataset.renderFrame,world:c.dataset.world}));
 await page.setViewportSize({width:1600,height:1100});await page.goto('http://127.0.0.1:4182/hub/');await page.locator('main[data-ready=true]').waitFor({timeout:30000});
 const canvas=await page.locator('canvas').elementHandle();const desk=await state();
 await page.screenshot({path:'output/playwright/robotics-details/01-desk.png'});
 // Test actual robot entry and both exhibit meshes, with screenshots of rendered geometry.
 const robot=await page.locator('canvas').evaluate(c=>JSON.parse(c.dataset.robotScreen));
 await page.mouse.click(...robot);await page.locator('main[data-phase=workshop]').waitFor({timeout:30000});
 const workshop=await state();await page.screenshot({path:'output/playwright/robotics-details/02-workshop-labels.png'});
 await page.mouse.move(560,410);await page.waitForFunction(()=>document.querySelector('[data-attention=true] strong')?.textContent==='Gesture Rover');
 await page.mouse.click(560,410);let panel=page.getByRole('dialog',{name:'Gesture Rover'});await panel.waitFor();
 assert(await panel.getAttribute('aria-modal')==='false','Panel hides nonmodal semantics');
 assert(await panel.getByRole('button',{name:'Close project details'}).evaluate(e=>e===document.activeElement),'Close not focused');
 assert(await panel.getByText('No demo video provided yet.',{exact:true}).count()===1,'Rover fake/missing demo');
 assert(await panel.getByText('Provisional description',{exact:true}).count()===1,'Rover inspiration not marked provisional');
 assert(await panel.locator('a').count()===0,'Unverified Rover link present');
 await page.screenshot({path:'output/playwright/robotics-details/03-rover-panel.png'});
 const panelElement=await panel.elementHandle();
 await page.mouse.move(1020,435);await page.mouse.click(1020,435);panel=page.getByRole('dialog',{name:'Guiding Hands'});await panel.waitFor();
 assert(await panelElement.evaluate(e=>e===document.querySelector('[role=dialog]')),'Panel shell recreated instead of reused');
 assert(await panel.getByRole('link',{name:'View repository'}).getAttribute('href')==='https://github.com/BigZ509/guiding-hands','Wrong verified repo URL');
 assert(await panel.getByText('Making hand-movement rehabilitation exercises more engaging through an interactive computer-vision game.',{exact:true}).count()===1,'Confirmed inspiration missing');
 assert(await panel.getByText('No demo video provided yet.',{exact:true}).count()===1,'Guiding demo not unavailable');
 assert(await page.locator('video,iframe').count()===0,'Unconfirmed media embedded');
 const pose=await state();assert(JSON.stringify(workshop.position)===JSON.stringify(pose.position)&&JSON.stringify(workshop.target)===JSON.stringify(pose.target),'Opening/switching details changed camera');
 const geometry=await panel.boundingBox();assert(geometry.width<1600*.4,'Panel obscures room');
 await page.screenshot({path:'output/playwright/robotics-details/04-guiding-panel.png'});
 await page.keyboard.press('Escape');assert(await page.getByRole('dialog').count()===0,'Escape did not close details');
 assert(await page.locator('main').getAttribute('data-phase')==='workshop','First Escape left workshop');
 const nav=page.getByRole('group',{name:'Select a project exhibit'});
 assert(await nav.getByRole('button',{name:'Guiding Hands',exact:true}).evaluate(e=>e===document.activeElement),'Focus did not restore after close');
 await page.keyboard.press('Space');await page.getByRole('dialog',{name:'Guiding Hands'}).waitFor();
 await page.getByRole('dialog').getByRole('button',{name:'Close project details'}).click();
 await nav.getByRole('button',{name:'Gesture Rover',exact:true}).focus();await page.keyboard.press('Enter');await page.getByRole('dialog',{name:'Gesture Rover'}).waitFor();
 await page.screenshot({path:'output/playwright/robotics-details/05-keyboard-panel.png'});
 // The panel is nonmodal: header Back is still available and clears details immediately.
 await page.getByRole('button',{name:'Back to Desk'}).click();await page.locator('main[data-phase=desk][data-world=desk]').waitFor({timeout:30000});
 await page.waitForFunction(d=>{const c=document.querySelector('canvas');return JSON.stringify(JSON.parse(c.dataset.cameraPosition))===JSON.stringify(d.position)&&JSON.stringify(JSON.parse(c.dataset.cameraTarget))===JSON.stringify(d.target);},desk);
 assert(await page.getByRole('dialog').count()===0,'Panel persisted into desk');assert(await canvas.evaluate(c=>c===document.querySelector('canvas')),'Canvas identity changed');
 assert(await page.getByRole('button',{name:'Visit robotics workshop'}).evaluate(e=>e===document.activeElement),'Desk invoking focus lost');
 await page.screenshot({path:'output/playwright/robotics-details/06-returned-desk.png'});
 await page.keyboard.press('Enter');await page.locator('main[data-phase=workshop]').waitFor({timeout:30000});
 assert(await page.getByRole('dialog').count()===0,'Repeat entry retained panel');
 // Regression: switching after scroll starts the new project at the beginning.
 await nav.getByRole('button',{name:'Guiding Hands',exact:true}).click();await page.setViewportSize({width:1280,height:720});
 const scroller=page.getByRole('dialog').getByRole('region',{name:'Guiding Hands details'});
 const scrollBefore=await scroller.evaluate(e=>{e.scrollTop=e.scrollHeight;return e.scrollTop;});assert(scrollBefore>0,'Scroll test has no overflow');
 await page.getByRole('dialog').getByRole('button',{name:'Gesture Rover',exact:true}).click();
 assert(await page.getByRole('region',{name:'Gesture Rover details'}).evaluate(e=>e.scrollTop)===0,'Project switch retained scroll');
 await page.getByRole('region',{name:'Gesture Rover details'}).focus();await page.keyboard.press('PageDown');
 await page.waitForFunction(()=>document.querySelector('[role=region][aria-label="Gesture Rover details"]').scrollTop>0);
 await page.keyboard.press('Escape');await page.keyboard.press('Escape');await page.locator('main[data-phase=desk]').waitFor({timeout:30000});
 assert(!requests.some(u=>/handtest|Knight-Hacks|youtube|vimeo/i.test(u)),'Unconfirmed media/link requested');
 assert(!errors.length,JSON.stringify(errors));
 const environment=await page.locator('canvas').evaluate(c=>{const gl=c.getContext('webgl2'),d=gl.getExtension('WEBGL_debug_renderer_info');return{renderer:gl.getParameter(d.UNMASKED_RENDERER_WEBGL),userAgent:navigator.userAgent,canvases:document.querySelectorAll('canvas').length};});
 return{checks:{meshOpenBoth:'Pass',singleReusablePanel:'Pass',verifiedDataAndUnavailableVideos:'Pass',sameCanvasAndCamera:'Pass',roomVisible:'Pass',keyboardEnterSpace:'Pass',escapeCloseThenReturn:'Pass',closeRestoresFocus:'Pass',headerBackWithPanel:'Pass',repeatVisitReset:'Pass',switchResetsScroll:'Pass',keyboardScroll:'Pass'},desk,workshop,environment,errors,warnings};
}
