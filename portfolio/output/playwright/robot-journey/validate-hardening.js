async (page) => {
  const checks={},errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const desk=()=>page.locator('main[data-ready=true][data-phase=desk]').waitFor({timeout:30000});
  const world=()=>page.locator('main[data-phase=workshop]').waitFor({timeout:30000});
  await page.goto('http://127.0.0.1:4182/hub/');await desk();
  await page.getByRole('button',{name:'Visit robotics workshop'}).focus();
  const point=await page.locator('canvas').evaluate(c=>JSON.parse(c.dataset.robotScreen));
  await page.mouse.move(...point);await page.mouse.move(1500,900);
  if(!await page.getByText('Meet the workshop’s resident').isVisible())throw new Error('Pointer leave cleared keyboard focus attention');
  await page.screenshot({path:'output/playwright/robot-journey/12-focus-and-pointer.png'});
  checks.mixedAttention='Pass; focus highlight/label persists after pointer leaves robot';

  await page.keyboard.press('Enter');
  await page.locator('main[data-phase=approaching]').waitFor();
  await page.waitForFunction(()=>{const x=JSON.parse(document.querySelector('canvas').dataset.cameraPosition)[0];return x<8.7 && x>5.5;});
  const sampling=page.evaluate(()=>new Promise(resolve=>{
    const samples=[],start=performance.now();
    const sample=()=>{const c=document.querySelector('canvas'),cover=document.querySelector('[class*="cover"]');samples.push({position:JSON.parse(c.dataset.cameraPosition),opacity:Number(getComputedStyle(cover).opacity)});if(performance.now()-start<800)requestAnimationFrame(sample);else resolve(samples);};sample();
  }));
  await page.keyboard.press('Escape');
  const samples=await sampling;await desk();
  const first=samples[0].position;let covered=false;
  const visible=samples.filter(s=>{if(s.opacity>=.95)covered=true;return !covered;});
  const maxVisibleDelta=Math.max(0,...visible.map(s=>Math.hypot(...s.position.map((v,i)=>v-first[i]))));
  if(maxVisibleDelta>1.5)throw new Error(JSON.stringify({message:'Cancel jumped before cover',samples,maxVisibleDelta}));
  checks.cancelContinuity={status:'Pass',maxVisibleDelta,visibleSamples:visible.length,samples,note:'Sampled before the first opaque cover; no pending-endpoint jump'};

  await page.getByRole('button',{name:'Visit robotics workshop'}).click();
  await page.locator('main[data-phase=approaching]').waitFor();
  await page.emulateMedia({reducedMotion:'reduce'});await world();
  await page.waitForFunction(()=>{const r=JSON.parse(document.querySelector('canvas').dataset.robotAnimation);return r.reducedMotion&&!r.playing;});
  const still=await page.locator('canvas').evaluate(c=>({camera:JSON.parse(c.dataset.cameraPosition),robot:JSON.parse(c.dataset.robotAnimation)}));
  await page.screenshot({path:'output/playwright/robot-journey/13-live-reduced-motion.png'});
  await page.keyboard.press('Escape');await desk();
  checks.liveReducedMotion={status:'Pass',still,note:'Preference changed during approach; active move settled, later stages immediate, frozen workshop reachable and return works'};
  await page.emulateMedia({reducedMotion:'no-preference'});

  const context=await page.context().browser().newContext({viewport:{width:1000,height:800}});
  try {
    const p=await context.newPage();await p.route('**/models/desk-compositions/desk.glb',()=>{});
    await p.goto('http://127.0.0.1:4182/hub/');
    await p.getByRole('alert').filter({hasText:'The workshop is still open.'}).waitFor({timeout:20000});
    await p.screenshot({path:'output/playwright/robot-journey/14-stalled-load-fallback.png'});
    await p.getByRole('link',{name:'Read robotics notes',exact:true}).click();
    await p.getByRole('heading',{name:'Things that move.'}).waitFor();
    checks.initialDeadline='Pass; held desk.glb indefinitely, explicit fallback appeared after bounded foreground wait and notes remained usable';
  }finally{await context.close();}
  if(errors.length)throw new Error(JSON.stringify(errors));
  return {checks,errors,hiddenTab:'Source-hardened visibility policy; actual OS tab suspension remains unverified'};
}
