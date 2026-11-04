async (page) => {
  const p = page.context().browser().contexts().flatMap(c=>c.pages()).find(p=>p.viewportSize()?.width===390);
  if (!p) throw new Error('Mobile preview page missing');
  const labels = await p.locator('[data-selected]').evaluateAll(es=>es.map(e=>({text:e.innerText,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})));
  if (labels.length!==2 || labels.some(l=>l.left<12 || l.right>378)) throw new Error(`Exhibit label outside mobile viewport: ${JSON.stringify(labels)}`);
  return {labels,check:'Pass: both project/placeholder labels fully visible'};
}
