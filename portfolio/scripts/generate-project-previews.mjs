// Original interface concepts. No third-party screenshots, marks or app assets.
import { mkdir, writeFile } from 'node:fs/promises';
const target = new URL('../public/previews/', import.meta.url);
await mkdir(target, { recursive: true });
const box=(x,y,w,h,c,r=12,stroke='none')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}" stroke="${stroke}"/>`;
const text=(x,y,t,size=20,c='#26383b',weight=400)=>`<text x="${x}" y="${y}" fill="${c}" font-size="${size}" font-weight="${weight}" font-family="Arial,Helvetica,sans-serif">${t}</text>`;
const line=(x,y,x2,y2,c,w=2)=>`<path d="M${x} ${y}L${x2} ${y2}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
const dot=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const pill=(x,y,w,label,bg,fg)=>box(x,y,w,28,bg,14)+text(x+12,y+19,label,13,fg,600);
const label=(dark=false)=>box(0,508,960,32,dark?'#24263b':'#e7eae5',0)+text(24,529,'CONCEPT PREVIEW  /  SAMPLE DATA',12,dark?'#d2cfe6':'#536763',600);
const svg=(name,title,body,w=768,h=432)=>writeFile(new URL(name,target),`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 960 540" role="img" aria-labelledby="title"><title id="title">${title} — original concept preview, sample data</title>${body}</svg>\n`);

let road=box(0,0,960,540,'#f1f3ef',0)+box(0,0,960,70,'#ffffff',0)+box(22,20,30,30,'#de6c36',8)+line(32,42,42,28,'#fff',3)+text(64,43,'Road Report',23,'#263b3c',700)+text(243,42,'Incident workspace',15,'#6d7c79')+box(594,17,228,36,'#f2f5f2',8)+text(610,40,'Search roads or reports',14,'#83918b')+pill(837,21,100,'Live map','#e8f0e8','#426a56');
road+=text(24,109,'Recent reports',23,'#283c3e',700)+text(24,133,'Review and classify road hazards',13,'#72817b');
[['Pothole','Oak Avenue','Needs review','#fdf0df','#9c6022'],['Road debris','Harbor Boulevard','Classified','#e8f0e8','#47745d'],['Obstruction','West Loop','Needs review','#fdf0df','#9c6022']].forEach(([kind,street,state,bg,fg],i)=>{const y=151+i*112;road+=box(18,y,237,100,'#fff',10,'#dfe5df')+dot(37,y+24,5,'#e5793a')+text(50,y+30,kind,17,'#344643',600)+text(32,y+55,street,14,'#7c8b84')+pill(31,y+65,139,state,bg,fg);});
road+=box(275,88,665,405,'#dfe8df',12);
for(let i=0;i<7;i++)for(let j=0;j<4;j++){const x=291+i*93,y=105+j*95;road+=box(x,y,72,72,(i+j)%3?'#d5e0d3':'#c4d7be',7);}
road+='<path d="M905 82C784 168 944 258 814 329S795 455 715 501" fill="none" stroke="#a8cbd4" stroke-width="37"/>';
[[288,180,935,180],[280,310,938,310],[354,91,354,490],[570,91,570,491],[761,91,761,491]].forEach(p=>{road+=line(...p,'#fafbf7',18)+line(...p,'#cdd4cb',1);});
road+='<path d="M280 426C454 359 621 473 935 365" fill="none" stroke="#fbfaf4" stroke-width="25"/><path d="M280 426C454 359 621 473 935 365" fill="none" stroke="#d9c1a1" stroke-width="2"/>';
[[365,201],[599,337],[778,176]].forEach(([x,y],i)=>{road+=dot(x,y,23,'#e57d4340')+dot(x,y,14,i===1?'#c75842':'#df743a')+text(x-3,y+6,'!',18,'#fff',700);});
road+=box(296,108,220,58,'#fffffff2',10)+text(311,132,'3 sample incidents',19,'#354b46',700)+text(311,152,'Current map selection',12,'#7b8c83')+box(695,439,223,35,'#fffffff2',7)+dot(710,457,5,'#df743a')+text(724,462,'Hazard',13)+dot(802,457,5,'#8baa8b')+text(814,462,'Classified',13)+label();
await svg('road-report.svg','Road Report mapping dashboard',road);

let speech=box(0,0,960,540,'#171c38',0)+'<defs><linearGradient id="glow" x2="1" y2="1"><stop stop-color="#354581"/><stop offset="1" stop-color="#25233f"/></linearGradient></defs>'+box(0,0,960,508,'url(#glow)',0)+dot(170,270,204,'#5553af24');
speech+=box(46,20,264,478,'#0e142c',35,'#6b79a4')+box(56,30,244,458,'#f6f6ff',29)+box(132,37,92,17,'#11172d',9)+text(74,64,'9:41',12,'#53617d',600)+dot(273,59,4,'#53617d')+box(72,91,27,27,'#7772d7',8)+text(80,111,'S',18,'#fff',700)+text(108,112,'SpeakLab',20,'#31344f',700)+text(74,154,'Find your',27,'#242d4b',700)+text(74,187,'natural voice.',27,'#242d4b',700)+text(74,213,'Sample practice session',13,'#7e86a3');
speech+=box(72,235,212,101,'#e8e8fa',16);for(let i=0;i<34;i++){const h=8+Math.abs(Math.sin(i*.73))*Math.abs(Math.cos(i*.19))*57;speech+=line(84+i*5.65,286-h/2,84+i*5.65,286+h/2,i%5?'#7772d7':'#aaa3ec',3);}
speech+=pill(106,350,146,'●  01:24 / 02:00','#7772d7','#fff')+text(74,415,'Pause. Breathe. Try again.',15,'#6b7290')+box(130,447,95,5,'#c4c7d7',3);
speech+=text(352,66,'SpeakLab AI',34,'#f4f1ff',700)+text(353,99,'A clearer voice, one practice at a time.',19,'#b4bfdf')+box(351,127,570,108,'#f5f5fc',15)+text(373,157,'TRANSCRIPT PREVIEW',12,'#767a9d',700)+text(373,186,'“Today, I’m practicing a clear,',23,'#343c5a')+text(373,216,'confident introduction.”',23,'#343c5a');
[['132','words / min'],['3','filler words'],['0.8s','avg. pause']].forEach(([v,l],i)=>{const x=351+i*195;speech+=box(x,254,180,98,'#ffffff12',13,'#a2acd935')+text(x+18,295,v,35,'#eeecff',700)+text(x+18,326,l,15,'#b9c3e1');});
speech+=box(351,372,570,112,'#e6e1ff',15)+dot(382,403,12,'#8271cc')+text(376,410,'✦',17,'#fff')+text(407,409,'Sample AI feedback',20,'#453e70',700)+text(374,444,'Give each idea a little room.',23,'#403956',600)+text(374,469,'Try a brief pause between sentences.',16,'#766a99')+label(true);
await svg('speaklab.svg','SpeakLab AI speech coaching mobile app',speech);

let xp=box(0,0,960,540,'#171925',0)+box(0,0,166,508,'#202231',0)+box(22,26,34,34,'#8a79dd',9)+text(33,51,'Z',23,'#fff',700)+text(66,50,'ZBXP',24,'#efedff',700)+text(23,100,'WORKSPACE',11,'#868aa4',700);
[['▦','Overview'],['✓','My tasks'],['◷','Focus'],['↗','Guild']].forEach(([icon,t],i)=>{const y=120+i*55;xp+=i===0?box(13,y,140,43,'#8470ce30',8):'';xp+=text(25,y+28,icon,18,i?'#8e93ad':'#b7a5fa')+text(53,y+28,t,15,i?'#a6abc1':'#eee9ff',i?400:600);});
xp+=text(23,450,'SMALL WINS',12,'#a399c2',700)+text(23,474,'Real momentum.',14,'#d0c9e6');xp+=text(193,49,'Your focus, leveled up.',30,'#f1f0fc',700)+text(194,78,'Today · Sample workspace',15,'#8f95b1')+pill(776,27,158,'10-day streak','#e7a95d20','#e9b573');
xp+=box(191,105,315,180,'#252b43',14,'#505d8d60')+text(212,137,'POMODORO / FOCUS',12,'#adb8e5',700)+text(211,204,'25:00',60,'#f2f2ff',700)+text(214,233,'One task. Your full attention.',15,'#a0accc')+pill(387,233,96,'▶  Start','#8d7bd7','#fff');
xp+=box(523,105,413,180,'#242337',14,'#6a548e60')+text(546,137,'YOUR PROGRESSION',12,'#b9a9d8',700)+text(545,185,'Level 7',36,'#f1eaff',700)+text(546,216,'420 / 600 XP',18,'#bcacd9')+box(545,239,367,12,'#3a354f',6)+box(545,239,257,12,'#a28be9',6)+text(546,273,'Keep the streak. Build the habit.',13,'#9f94ba');
xp+=box(191,307,441,180,'#222636',14)+text(212,340,'Today’s quests',22,'#e5e8f5',700)+pill(520,321,90,'2 / 3 done','#374562','#acbde1');
[['Review changes',true],['Test the next flow',true],['Write project notes',false]].forEach(([t,done],i)=>{const y=355+i*39;xp+=box(213,y,19,19,done?'#8678c5':'#2f354a',5,done?'none':'#5b6584')+(done?text(217,y+15,'✓',13,'#fff',700):'')+text(245,y+16,t,16,done?'#979eb9':'#e4e8fa')+line(213,y+31,608,y+31,'#343a4e',1);});
xp+=box(649,307,287,180,'#242738',14)+text(669,340,'Guild leaderboard',20,'#e4e6f6',700);[['1','You','420 XP'],['2','Member 02','380 XP'],['3','Member 03','350 XP']].forEach(([n,name,value],i)=>{const y=366+i*39;xp+=dot(680,y-3,12,i?'#3c425b':'#8d7bd7')+text(676,y+2,n,12,'#fff',600)+text(704,y+3,name,15,i?'#a3acc7':'#eee9ff')+text(849,y+3,value,13,'#a89ec7');});
xp+=label(true);await svg('zbxp.svg','ZBXP gamified productivity dashboard',xp);

let desktop=box(0,0,960,540,'#18292f',0)+box(0,0,960,47,'#23363b',0)+dot(25,24,5,'#eac68f')+text(41,29,'WORKROOM / PORTFOLIO',13,'#c5d0c9',600)+text(850,29,'LOCAL',11,'#87a99d',600)+text(50,111,'Marc Alexis',46,'#f2ead8',600)+text(52,146,'Software Engineering  /  Robotics  /  Creative Technology',17,'#a9bbb6')+text(52,188,'Software, intelligent systems &amp; interactive experiences.',19,'#d0d9d0')+pill(52,216,155,'Open Portfolio ↗','#eac68f','#22373a');
[['SpeakLab AI','Speech coaching','#9794da'],['Road Report','Road incident reporting','#dcad79'],['ZBXP','Gamified productivity','#a191d3']].forEach(([name,sub,c],i)=>{const x=51+i*290;desktop+=box(x,289,274,157,'#233b40',12,'#496063')+box(x+17,307,36,36,c,9)+text(x+28,332,String(i+1),20,'#1e2b32',700)+text(x+18,377,name,25,'#f0e5ce',600)+text(x+18,408,sub,15,'#b8cac2');});
desktop+=text(52,495,'RESUME     SOFTWARE     ROBOTICS     ABOUT / CONTACT',15,'#c9c7b4',600);await svg('portfolio-desktop.svg','Marc Alexis portfolio dashboard',desktop,512,288);
