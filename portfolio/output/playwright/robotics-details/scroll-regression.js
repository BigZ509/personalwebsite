async(page)=>{
 await page.setViewportSize({width:1280,height:720});
 const panel=page.getByRole('dialog');
 await panel.getByRole('button',{name:'Guiding Hands',exact:true}).click();
 const body=panel.locator('div').filter({has:panel.locator('#project-summary')}).last();
 // Use the actual scroll container, not a DOM control that bypasses project switching.
 const scroller=panel.locator('[class*=panelBody]');
 const before=await scroller.evaluate(e=>{e.scrollTop=e.scrollHeight;return {top:e.scrollTop,height:e.clientHeight,total:e.scrollHeight};});
 if(before.top<=0)throw new Error('Test requires a scrollable panel');
 await panel.getByRole('button',{name:'Gesture Rover',exact:true}).click();
 const after=await scroller.evaluate(e=>e.scrollTop);
 if(after!==0)throw new Error(`Project switch retained prior scroll offset: ${after}; previous=${JSON.stringify(before)}`);
 return {before,after};
}
