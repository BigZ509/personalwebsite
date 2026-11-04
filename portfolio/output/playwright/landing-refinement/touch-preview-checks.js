async page=>{
 const context=await page.context().browser().newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});const p=await context.newPage();await p.goto('http://127.0.0.1:4184/hub/',{waitUntil:'networkidle'});await p.locator('main[data-ready=true]').waitFor({timeout:30000});
 const results=[];
 for(const [title,id] of [['Software Engineering','Software'],['Photography','Photography'],['Basketball','Personal']]){await p.getByRole('button',{name:`Preview ${title} — in progress`,exact:true}).tap();const label=p.locator(`[data-desk-label="${id}"]`);await label.waitFor();await p.waitForTimeout(250);if(!await label.isVisible())throw new Error('Touch preview does not persist '+id);results.push({id,visibleAfterTap:true});}
 await p.screenshot({path:'output/playwright/landing-refinement/mobile-05-control-preview.png'});await context.close();return results;
}
