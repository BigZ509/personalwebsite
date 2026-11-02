async (page) => {
  const checks = {}, errors = [];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4182/');
  await page.locator('main[data-ready=true]').waitFor({timeout:30000});
  checks.home = {status:'Pass',title:await page.title(),canvases:await page.locator('canvas').count()};
  const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({url:r.name,encodedBytes:r.encodedBodySize,transferBytes:r.transferSize,durationMs:r.duration})).filter(r=>r.url.endsWith('.glb')||r.url.includes('/_next/static/')));
  await page.getByRole('button',{name:'Visit robotics workshop'}).click();
  await page.locator('main[data-phase=workshop]').waitFor({timeout:30000});
  const workshop=await page.locator('canvas').evaluate(c=>({drawCalls:Number(c.dataset.drawCalls),triangles:Number(c.dataset.triangles)}));
  const lose=await page.locator('canvas').evaluate(c=>{const ext=c.getContext('webgl2').getExtension('WEBGL_lose_context');if(!ext)return false;ext.loseContext();return true;});
  if(!lose)throw new Error('Context-loss extension not available');
  await page.getByRole('alert').filter({hasText:'The workshop is still open.'}).waitFor();
  await page.screenshot({path:'output/playwright/robot-journey/11-context-loss-fallback.png'});
  await page.getByRole('link',{name:'Read robotics notes',exact:true}).click();
  await page.getByRole('heading',{name:'Things that move.'}).waitFor();
  checks.contextLoss = 'Pass; actual WebGL context lost in workshop, fallback notes link navigates successfully';
  await page.goto('http://127.0.0.1:4182/compositions/?view=cozy&clean=1');
  for(const mode of ['cozy','cinematic','stylized-game']) {
    await page.goto(`http://127.0.0.1:4182/compositions/?view=${mode}&clean=1`);
    await page.locator(`main[data-composition="${mode}"][data-scene-ready=true]`).waitFor({timeout:30000});
    if(await page.locator('canvas').count()!==1)throw new Error(`Multiple canvases in ${mode}`);
  }
  checks.archivedCompositions = 'Pass; all three treatments still load/render in one Canvas after shared helper extraction';
  if(errors.length)throw new Error(JSON.stringify(errors));
  return {checks,workshop,resources,errors,note:'Local static server and warm browser cache; durations are not deploy/mobile performance benchmarks'};
}
