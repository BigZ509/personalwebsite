async page=>{
 const assert=(v,m)=>{if(!v)throw new Error(m);},results=[];
 for(const size of [{width:740,height:360},{width:800,height:360}]){
  await page.setViewportSize(size);await page.goto('http://127.0.0.1:4184/hub/',{waitUntil:'networkidle'});await page.locator('main[data-ready=true]').waitFor({timeout:30000});await page.getByRole('button',{name:'Visit robotics workshop'}).click();await page.locator('main[data-phase=workshop]').waitFor({timeout:30000});
  await page.getByRole('group',{name:'Select a project exhibit'}).getByRole('button',{name:'Guiding Hands',exact:true}).click();
  const project=page.getByRole('dialog',{name:'Guiding Hands'});await project.waitFor();
  const box=await project.boundingBox(),back=await page.getByRole('button',{name:'Back to Desk'}).boundingBox();assert(box.y>=back.y+back.height,'Short project inspector covers Back');
  const region=project.getByRole('region',{name:/Project content/});
  const body=await project.locator('[tabindex="0"]').evaluate(e=>({height:e.clientHeight,scroll:e.scrollHeight}));assert(body.height>20&&body.scroll>body.height,'Short project content not scrollable');
  await page.getByRole('navigation',{name:'Personal navigation'}).getByRole('button',{name:'About',exact:true}).click();const about=page.getByRole('dialog',{name:'About Marc'});await about.waitFor();await page.screenshot({path:`output/playwright/portfolio-identity/layout-${size.width}x${size.height}-about.png`});await page.keyboard.press('Escape');assert(await project.isVisible(),'Short About Escape lost project');
  await page.screenshot({path:`output/playwright/portfolio-identity/layout-${size.width}x${size.height}-panel.png`});await page.getByRole('button',{name:'Back to Desk'}).click();await page.locator('main[data-phase=desk]').waitFor({timeout:30000});results.push({viewport:size,project:box,back,content:body,result:'Pass'});
 }
 return results;
}
