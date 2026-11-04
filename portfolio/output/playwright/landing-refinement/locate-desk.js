async page=>{
 await page.screenshot({path:'output/playwright/landing-refinement/first-hover-target-miss.png'});
 return await page.locator('canvas').evaluate(c=>{
  const p=JSON.parse(c.dataset.cameraPosition),t=JSON.parse(c.dataset.cameraTarget),r=c.getBoundingClientRect();
  const norm=v=>{const n=Math.hypot(...v);return v.map(x=>x/n);},cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
  const forward=norm(t.map((x,i)=>x-p[i])),right=norm(cross(forward,[0,1,0])),up=cross(right,forward),tan=Math.tan((r.width<760?53:38)*Math.PI/360);
  return Object.fromEntries(Object.entries({Robotics:[2.25,3.95,-.75],Software:[.9,3.25,.93],Photography:[-2.62,3.445,.73],Personal:[2.82,3.57,.95]}).map(([key,q])=>{const d=q.map((x,i)=>x-p[i]),depth=dot(d,forward);return[key,[r.x+(1+dot(d,right)/(depth*tan*r.width/r.height))*r.width/2,r.y+(1-dot(d,up)/(depth*tan))*r.height/2]];}));
 });
}
