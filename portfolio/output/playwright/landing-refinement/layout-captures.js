async page=>{
 await page.setViewportSize({width:1600,height:1100});await page.goto('http://127.0.0.1:4184/hub/',{waitUntil:'networkidle'});await page.locator('main[data-ready=true]').waitFor({timeout:30000});
 const layouts=[];
 for(const [width,height] of [[1600,1100],[1280,720],[1024,768],[390,844],[320,568],[740,360]]){
  await page.setViewportSize({width,height});await page.mouse.move(5,5);await page.waitForTimeout(300);await page.screenshot({path:`output/playwright/landing-refinement/after-${width}x${height}.png`});
  layouts.push(await page.evaluate(()=>{const c=document.querySelector('canvas').getBoundingClientRect(),i=document.querySelector('[aria-label="Desk navigation"]').getBoundingClientRect(),g=document.querySelector('[aria-label="Desk object previews"]').getBoundingClientRect();return{viewport:[innerWidth,innerHeight],canvas:{left:c.left,top:c.top,width:c.width,height:c.height,bottom:c.bottom},intro:{left:i.left,right:i.right,top:i.top,bottom:i.bottom},guide:{top:g.top,bottom:g.bottom}}}));
 }
 return layouts;
}
