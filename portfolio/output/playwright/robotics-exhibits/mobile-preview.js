async (page) => {
  const mobile = await page.context().browser().newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const p = await mobile.newPage();
  await p.goto('http://127.0.0.1:4182/hub/'); await p.locator('main[data-ready=true]').waitFor({timeout:30000});
  const robot = await p.locator('canvas').evaluate(c=>JSON.parse(c.dataset.robotScreen));
  await p.touchscreen.tap(...robot); await p.locator('main[data-phase=workshop]').waitFor({timeout:30000});
  await p.screenshot({path:'output/playwright/robotics-exhibits/08-mobile-workshop.png'});
  return {mobilePage:p.url(),labels:await p.locator('[data-selected]').evaluateAll(es=>es.map(e=>({text:e.innerText,rect:JSON.stringify(e.getBoundingClientRect())}))),phase:await p.locator('main').getAttribute('data-phase')};
}
