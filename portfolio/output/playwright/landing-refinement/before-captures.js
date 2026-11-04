async page=>{
 await page.goto('http://127.0.0.1:4184/hub/',{waitUntil:'networkidle'});await page.locator('main[data-ready=true]').waitFor({timeout:30000});
 for(const [width,height] of [[1600,1100],[1280,720],[390,844]]){await page.setViewportSize({width,height});await page.waitForTimeout(300);await page.screenshot({path:`output/playwright/landing-refinement/before-${width}x${height}.png`});}
 return{beforeBuild:'oZiZfW_rd_HYc9lIG0Hll',screenshots:'Actual current landing before Objective2 edits'};
}
