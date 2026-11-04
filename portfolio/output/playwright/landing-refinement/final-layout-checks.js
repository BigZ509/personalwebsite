async page=>{
 const assert=(v,m)=>{if(!v)throw new Error(m);},out='output/playwright/landing-refinement/',checks=[];
 await page.setViewportSize({width:1600,height:1100});await page.goto('http://127.0.0.1:4184/hub/',{waitUntil:'networkidle'});await page.locator('main[data-ready=true]').waitFor({timeout:30000});
 if(await page.locator('#desk-guide').isHidden())await page.getByRole('button',{name:'Desk guide',exact:true}).click();
 for(const [width,height] of [[1600,1100],[1280,880],[1280,720],[1024,768],[390,844],[740,360]]){
  await page.setViewportSize({width,height});await page.locator('main').evaluate(e=>e.scrollTop=0);await page.mouse.move(5,5);await page.waitForTimeout(300);const bounds=await page.evaluate(()=>{const nav=document.querySelector('nav[aria-label="Personal navigation"]').getBoundingClientRect(),intro=document.querySelector('[aria-label="Desk navigation"]').getBoundingClientRect(),c=document.querySelector('canvas').getBoundingClientRect();return{nav:{left:nav.left,right:nav.right},intro:{left:intro.left,right:intro.right,top:intro.top,bottom:intro.bottom},canvas:{left:c.left,top:c.top,width:c.width,height:c.height}};});assert(bounds.nav.left>=0&&bounds.nav.right<=width,'Nav overflow');
  if(width<=760&&height>540)assert(bounds.intro.bottom<=bounds.canvas.top,'Portrait intro overlaps scene');if(width>760&&width<=1100)assert(bounds.intro.right<bounds.canvas.left,'Medium intro overlaps scene');
  await page.screenshot({path:out+`after-${width}x${height}.png`});checks.push({viewport:[width,height],bounds,result:'Pass'});
 }
 const narrow=[];
 for(const [width,height] of [[375,500],[320,480],[320,568]]){
  await page.setViewportSize({width,height});await page.locator('main').evaluate(e=>e.scrollTop=0);await page.mouse.move(5,5);await page.waitForTimeout(200);await page.screenshot({path:out+`narrow-${width}x${height}-top.png`});
  const labels=[];for(const [title,id] of [['Software Engineering','Software'],['Photography','Photography'],['Basketball','Personal']]){await page.getByRole('button',{name:`Preview ${title} — in progress`,exact:true}).focus();const l=page.locator(`[data-desk-label="${id}"]`);await l.waitFor();await page.waitForTimeout(250);const box=await l.boundingBox(),opacity=await l.evaluate(e=>Number(getComputedStyle(e).opacity));assert(box.x>=0&&box.x+box.width<=width&&box.y>=0&&box.y+box.height<=height&&opacity===1,'Unsettled/clipped label');labels.push({id,box,opacity});}
  await page.screenshot({path:out+`narrow-${width}x${height}-preview.png`});narrow.push({viewport:[width,height],labels,result:'Pass'});
 }
 return{layouts:checks,narrow};
}
