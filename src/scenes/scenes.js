// One generator per scene key. Each returns { bg?: CSS background, layers: [{ z, s }] }
// z = parallax depth (0 = fixed sky, 1 = moves with the page, >1 = foreground). s = SVG markup.
import { RNG, n1, R, C, E, P, S, T, vg, rg, DEEP, stars, skyline, hills, jag, person, crowd, smoke, falling, chart, grid, palm, heli, plane, ship, columns, car, derrick, crane, chimney } from './svg.js';

export const SC = {
 now(r){return {layers:[
   {z:.1,s:stars(r,170,620)},
   {z:.25,s:E(1050,250,560,140,'none','stroke="#9fb4ff" stroke-opacity=".18" stroke-width="1.4" transform="rotate(-8 1050 250)"')+`<g class="hover">${R(1300,150,26,9,'#dde5ff','rx="2"')+R(1284,152,12,5,'#7c93e8')+R(1328,152,12,5,'#7c93e8')}</g>`},
   {z:.35,s:R(0,560,1600,440,'#5466b0','opacity=".18"')+skyline(r,{base:1000,minH:150,maxH:330,fill:'#1b2448'})},
   {z:.7,s:skyline(r,{base:1000,minH:90,maxH:230,wMin:70,wMax:140,gap:7,fill:'#0b1124',win:'#ffd98a',winP:.3})},
 ]}},
 ukraine(r){return {bg:'linear-gradient(#1a2840 0%,#3a4d6c 42%,#b48a52 82%,#d9ae62 100%)',layers:[
   {z:.1,s:C(1180,600,86,'#f3d08a','opacity=".8"')+C(1180,600,170,'#f3d08a','opacity=".12"')},
   {z:.3,s:smoke(r,1020,600,'#1a2030',.28)+smoke(r,1340,640,'#1a2030',.24)+skyline(r,{base:800,minH:110,maxH:250,wMin:70,wMax:130,gap:10,fill:'#28324c',win:'#ffcf7a',winP:.05})},
   {z:.6,s:R(-20,790,1640,210+DEEP,'#9b7834')+(()=>{let g='';for(let i=0;i<260;i++){const x=r()*1600,y=800+r()*200,h=20+r()*40;g+=S(`M ${n1(x)} ${n1(y)} L ${n1(x+4)} ${n1(y-h)}`,'#d7b25e',2,`opacity="${n1(.4+r()*.5)}"`)}return g})()},
   {z:1.15,s:(()=>{let g='';for(let i=0;i<90;i++){const x=r()*1640-20,h=120+r()*140,y=1000;g+=S(`M ${n1(x)} ${y+DEEP} Q ${n1(x+8)} ${n1(y-h/2)} ${n1(x+14)} ${n1(y-h)}`,'#3b2d14',3)+E(x+15,y-h-8,5,15,'#4a3818',`transform="rotate(12 ${n1(x+15)} ${n1(y-h-8)})"`)}return g})()},
 ]}},
 pandemic(r){return {bg:'linear-gradient(#0b1416 0%,#13221f 60%,#1d2a22 100%)',layers:[
   {z:.05,s:grid()},
   {z:.3,s:skyline(r,{base:1000,minH:120,maxH:300,fill:'#16231f',win:'#d8e6c8',winP:.05})},
   {z:.6,s:chart([.55,.57,.6,.6,.63,.66,.64,.2,.32,.48,.58,.66,.72,.76],{x0:-20,x1:1620,top:250,bot:700,col:'#e8b34e',dots:true})+T(1010,330,'Q2 2020 · SHARPEST DROP SINCE 1930s','#f2c062',15,'letter-spacing="1.5"')},
   {z:1.2,s:falling(r,18,'#e9efe6',{x0:700,w:[14,22],h:[8,12],op:[.25,.6],rx:4})},
 ]}},
 mrna(r){const g=rg([[0,'#5ccbc4',.35],[1,'#5ccbc4',0]]);let helix='';const cx=1080;for(let i=0;i<=40;i++){const y=60+i*24,a=i*.42,x1=cx+Math.sin(a)*120+i*4,x2=cx+Math.sin(a+Math.PI)*120+i*4;helix+=S(`M ${n1(x1)} ${n1(y)} L ${n1(x2)} ${n1(y)}`,'#9fe6df',3,`opacity="${n1(.3+.4*Math.abs(Math.cos(a)))}"`)+C(x1,y,5,'#5ccbc4')+C(x2,y,5,'#f1ece2','opacity=".8"')}
   let virus='';for(let i=0;i<14;i++){const x=600+r()*1000,y=r()*900,rr=10+r()*22;let sp='';for(let k=0;k<12;k++){const a=k/12*Math.PI*2;sp+=S(`M ${n1(x+Math.cos(a)*rr)} ${n1(y+Math.sin(a)*rr)} L ${n1(x+Math.cos(a)*(rr+8))} ${n1(y+Math.sin(a)*(rr+8))}`,'#e4644c',2.5,'opacity=".5"')}virus+=`<g class="drift" style="animation-delay:-${n1(r()*9)}s">${C(x,y,rr,'#e4644c','opacity=".35"')+sp}</g>`}
   return {bg:'linear-gradient(#04101a 0%,#0a2530 100%)',layers:[
   {z:.1,s:`<defs>${g.def}</defs>`+C(1080,500,520,`url(#${g.id})`)},
   {z:.3,s:virus},
   {z:.6,s:helix},
   {z:1.2,s:[1250,1380,1500].map((x,i)=>R(x,760-i*20,70,240+DEEP,'#d7f2ee','rx="14" opacity=".9"')+R(x-4,740-i*20,78,36,'#2b6f73','rx="6"')+R(x+6,840-i*20,58,60,'#5ccbc4','opacity=".6" rx="4"')).join('')},
 ]}},
 lockdown(r){let blk=R(820,200,520,800+DEEP,'#141a33');for(let y=240;y<980;y+=56)for(let x=850;x<1320;x+=48){const lit=r()<.62;blk+=R(x,y,30,38,lit?'#ffcf86':'#0c1026',lit?`opacity="${n1(.55+r()*.45)}"`:'');if(lit&&r()<.3)blk+=C(x+15,y+20,6,'#3a2a1c')+R(x+8,y+26,14,12,'#3a2a1c','rx="5"')}
   return {bg:'linear-gradient(#0a0e1e 0%,#1c2240 100%)',layers:[
   {z:.1,s:stars(r,80,400)+C(1380,150,46,'#f1ece2','opacity=".9"')},
   {z:.3,s:skyline(r,{base:1000,minH:200,maxH:420,wMin:120,wMax:200,gap:20,fill:'#111631',win:'#ffcf86',winP:.18})},
   {z:.65,s:blk},
   {z:1.15,s:R(-20,940,1640,60+DEEP,'#07091a')+R(600,620,6,320,'#07091a')+R(600,620,40,6,'#07091a')+E(640,632,40,90,'#ffcf86','opacity=".12"')},
 ]}},
 nine11(r){const b=vg([[0,'#bcd2ff',0],[1,'#bcd2ff',.55]]);return {bg:'linear-gradient(#070b1a 0%,#1d2a4c 65%,#3a3656 100%)',layers:[
   {z:.1,s:stars(r,120,560)},
   {z:.2,s:`<defs>${b.def}</defs>`+R(980,-200,34,960,`url(#${b.id})`)+R(1050,-200,34,960,`url(#${b.id})`)},
   {z:.4,s:skyline(r,{base:840,minH:120,maxH:300,wMin:50,wMax:90,fill:'#1a2340',win:'#c8d4ff',winP:.12})},
   {z:.75,s:skyline(r,{base:900,minH:60,maxH:180,wMin:70,wMax:130,gap:6,fill:'#0b1124',win:'#ffd98a',winP:.18})},
   {z:1.15,s:R(-20,900,1640,100+DEEP,'#060a16')+(()=>{let g='';for(let i=0;i<40;i++)g+=R(r()*1600,920+r()*70,30+r()*80,2,'#ffd98a',`opacity="${n1(.15+r()*.3)}"`);return g})()},
 ]}},
 gfc(r){return {bg:'linear-gradient(#0a100f 0%,#16201d 55%,#2b2414 100%)',layers:[
   {z:.05,s:grid()},
   {z:.3,s:skyline(r,{base:1000,minH:90,maxH:250,fill:'#1d2925'})},
   {z:.6,s:chart([.42,.45,.5,.48,.58,.62,.7,.68,.8,.88,.94,.96,.88,.9,.62,.52,.56,.36,.27,.31,.13,.05],{x0:-20,x1:1620,top:250,bot:720,col:'#f2c062'})+C(1035,262,7,'#f2c062')+T(1060,250,'15 SEP 2008 · LEHMAN FILES FOR BANKRUPTCY','#f2c062',15,'letter-spacing="1.5"')},
   {z:1.3,s:falling(r,30,'#ede6d6',{x0:650})},
 ]}},
 iphone(r){let city='';for(let i=0;i<220;i++){const w=6+r()*18;city+=R(r()*1600,300+r()*700,w,w*1.8,'#5ccbc4',`rx="2" opacity="${n1(.05+r()*.25)}"${r()<.08?' class="blink"':''}`)}
   let ph=R(1080,170,300,600,'#0d1220','rx="44" stroke="#c9d6e8" stroke-width="5"')+R(1100,230,260,480,'#14304a','rx="8"');const cols=['#5ccbc4','#e8b34e','#e4644c','#b9a0ef','#7fd18b','#f1ece2'];for(let j=0;j<6;j++)for(let i=0;i<4;i++)ph+=R(1116+i*62,250+j*74,46,46,cols[(i+j*2)%6],'rx="11" opacity=".85"');ph+=R(1190,200,80,8,'#c9d6e8','rx="4"');
   return {bg:'linear-gradient(#04060c 0%,#0f182c 100%)',layers:[
   {z:.15,s:city},
   {z:.6,s:`<g transform="rotate(-8 1230 470)">${ph}</g>`},
   {z:1.15,s:(()=>{let g='';for(let i=0;i<16;i++)g+=C(500+r()*1100,r()*1000,10+r()*40,['#5ccbc4','#b9a0ef','#e8b34e'][i%3],`opacity="${n1(.06+r()*.12)}"`);return g})()},
 ]}},
 obama(r){const sp=vg([[0,'#dfe6ff',.35],[1,'#dfe6ff',0]]);let conf='';const cols=['#e4644c','#f1ece2','#6f8fe8','#e8b34e'];for(let i=0;i<70;i++)conf+=R(400+r()*1200,-40-r()*200,8,14,cols[i%4],`class="fall" style="animation-duration:${n1(7+r()*8)}s;animation-delay:-${n1(r()*14)}s"`);
   return {bg:'linear-gradient(#0a0e22 0%,#1c2656 70%,#2b2f5a 100%)',layers:[
   {z:.1,s:`<defs>${sp.def}</defs>`+P('M 900 0 L 960 0 L 1300 1000 L 700 1000 Z',`url(#${sp.id})`,'opacity=".6"')+P('M 1300 0 L 1360 0 L 1600 1000 L 1050 1000 Z',`url(#${sp.id})`,'opacity=".4"')},
   {z:.35,s:conf},
   {z:.7,s:crowd(r,{base:900,f:'#0f1430',s:.9,step:20,arm:.25,signs:['VOTE','YES WE CAN'],signP:.07})},
   {z:1.2,s:crowd(r,{base:1010,f:'#060814',s:1.5,step:24,arm:.3})},
 ]}},
 wall(r){let gr='';const cols=['#e4644c','#e8b34e','#5ccbc4','#b9a0ef','#7fd18b','#f17ab0'];for(let i=0;i<46;i++){const x=r()*1600,y=670+r()*170;gr+=S(`M ${n1(x)} ${n1(y)} q ${n1(30+r()*60)} ${n1(-40+r()*80)} ${n1(60+r()*120)} ${n1(-20+r()*40)}`,cols[i%6],4+r()*8,`opacity="${n1(.55+r()*.4)}"`)}for(let x=0;x<1600;x+=118)gr+=R(x,640,2,260,'#5c5a54');
   let fw='';[[1000,220,'#e8b34e'],[1300,160,'#e4644c'],[1180,320,'#5ccbc4']].forEach(([x,y,c])=>{for(let k=0;k<16;k++){const a=k/16*Math.PI*2;fw+=S(`M ${n1(x+Math.cos(a)*14)} ${n1(y+Math.sin(a)*14)} L ${n1(x+Math.cos(a)*70)} ${n1(y+Math.sin(a)*70)}`,c,3,'opacity=".75" class="blink"')}});
   return {bg:'linear-gradient(#0c0f20 0%,#1e2242 80%,#2a2a44 100%)',layers:[
   {z:.1,s:stars(r,90,500)+fw},
   {z:.3,s:skyline(r,{base:660,minH:60,maxH:180,fill:'#171b33',win:'#ffd98a',winP:.1})},
   {z:.6,s:R(-20,640,1640,260+DEEP,'#8e8a80')+R(-20,632,1640,16,'#a7a399','rx="8"')+gr+crowd(r,{base:634,f:'#0e1020',s:.75,step:20,arm:.45})},
   {z:1.2,s:crowd(r,{base:1010,f:'#06070f',s:1.6,step:26,arm:.35})},
 ]}},
 china(r){return {bg:'linear-gradient(#2a1412 0%,#5c2a1c 45%,#c4643a 90%,#e08a48 100%)',layers:[
   {z:.1,s:C(1220,560,120,'#f6c06a','opacity=".85"')},
   {z:.3,s:crane(r()*0+900,900,420,'#3a1a14')+crane(1300,900,360,'#3a1a14')+skyline(r,{base:900,minH:40,maxH:200,ramp:.9,fill:'#3a1a14'})},
   {z:.6,s:chart([.05,.06,.06,.07,.08,.1,.12,.15,.19,.24,.3,.38,.47,.58,.7,.84,.98],{x0:-20,x1:1620,top:220,bot:780,col:'#e8b34e'})+T(1080,300,'GDP · 1978 → 2018','#f6d08a',15,'letter-spacing="1.5"')},
   {z:1.15,s:R(-20,930,1640,70+DEEP,'#1a0a08')+chimney(1120,940,240,40,'#1a0a08')+chimney(1200,940,300,46,'#1a0a08')+smoke(r,1220,600,'#2a120c',.3,6)},
 ]}},
 web(r){const nodes=[];for(let i=0;i<46;i++)nodes.push([700+r()*860,120+r()*680]);let net='';nodes.forEach((a,i)=>nodes.forEach((b,j)=>{if(j>i){const d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d<170)net+=S(`M ${n1(a[0])} ${n1(a[1])} L ${n1(b[0])} ${n1(b[1])}`,'#5ccbc4',1.5,`opacity="${n1(.5-d/400)}"`)}}));nodes.forEach(([x,y],i)=>net+=C(x,y,i%7?3.5:7,i%7?'#9fe6df':'#e8b34e',i%5===0?'class="blink"':''));
   return {bg:'linear-gradient(#03070e 0%,#0b1a2a 100%)',layers:[
   {z:.1,s:stars(r,100,1000)},
   {z:.3,s:`<g fill="none" stroke="#5ccbc4" stroke-opacity=".28" stroke-width="1.5">${C(1130,470,330,'none')}${[260,180,90].map(rx=>E(1130,470,rx,330,'none')).join('')}${[-220,-110,0,110,220].map(dy=>R(1130-Math.sqrt(330*330-dy*dy),470+dy,2*Math.sqrt(330*330-dy*dy),1,'#5ccbc4','opacity=".5"')).join('')}</g>`},
   {z:.6,s:net},
   {z:1.15,s:T(1180,930,'http://info.cern.ch','#9fe6df',22,'opacity=".7"')},
 ]}},
 mandela(r){const tree=(x,b,s)=>R(x-5*s,b-120*s,10*s,120*s+DEEP,'#2a1220')+E(x,b-130*s,110*s,26*s,'#2a1220')+E(x-40*s,b-118*s,60*s,16*s,'#2a1220');
   return {bg:'linear-gradient(#2b1830 0%,#8a4636 55%,#e8a858 92%,#f4c070 100%)',layers:[
   {z:.1,s:C(1150,700,150,'#ffd88a','opacity=".9"')+C(1150,700,260,'#ffd88a','opacity=".15"')},
   {z:.3,s:hills(r,820,60,'#5a2a2c')+tree(900,800,1)+tree(1380,790,.8)},
   {z:.6,s:R(-20,850,1640,150+DEEP,'#3a1a22')+crowd(r,{x0:500,x1:1650,base:870,f:'#1e0c14',s:.55,step:18})},
   {z:1.15,s:crowd(r,{base:1010,f:'#120610',s:1.5,step:26,arm:.4,signs:['VOTE'],signP:.05})},
 ]}},
 vietnam(r){return {bg:'linear-gradient(#1a2620 0%,#4f6a58 50%,#b9b993 100%)',layers:[
   {z:.1,s:C(1200,380,90,'#f2ecc8','opacity=".6"')},
   {z:.25,s:hills(r,760,90,'#5f7a66')+palm(300,780,.8,'#5f7a66')+palm(1400,770,.9,'#5f7a66')},
   {z:.45,s:heli(1060,250,1,'#1e2a24')+heli(1300,330,.7,'#2b3a32')+R(-20,640,1640,140,'#c9caa8','opacity=".25"')},
   {z:.7,s:hills(r,880,60,'#24342b')+palm(900,890,1.1,'#24342b')+palm(1180,900,1.3,'#24342b')+palm(1520,880,1,'#24342b')},
   {z:1.2,s:(()=>{let g=R(-20,960,1640,40+DEEP,'#0d1611');for(let i=0;i<120;i++){const x=r()*1640,h=40+r()*120;g+=P(`M ${n1(x)} 1000 Q ${n1(x+6)} ${n1(1000-h*.6)} ${n1(x+(r()-.5)*40)} ${n1(1000-h)} Q ${n1(x+10)} ${n1(1000-h*.5)} ${n1(x+12)} 1000 Z`,'#0d1611')}return g})()},
 ]}},
 oil(r){const cars=()=>{let g='';for(let x=-60;x<1700;x+=170)g+=R(x,930,140,40,'#140c06','rx="18"')+R(x+28,902,80,36,'#140c06','rx="14"')+C(x+30,972,14,'#140c06')+C(x+112,972,14,'#140c06');return g};
   return {bg:'linear-gradient(#1d140c 0%,#4a2e16 50%,#d0863a 92%,#e6a24e 100%)',layers:[
   {z:.1,s:C(1160,720,130,'#f6b663','opacity=".85"')},
   {z:.3,s:R(-20,800,1640,200+DEEP,'#3a2210')+derrick(820,800,280,'#3a2210')+derrick(1100,800,360,'#3a2210')+derrick(1400,800,240,'#3a2210')},
   {z:.6,s:chart([.12,.12,.13,.12,.13,.12,.13,.13,.14,.5,.56,.55,.57,.56],{x0:-20,x1:1620,top:250,bot:720,col:'#e8b34e'})+T(1020,300,'CRUDE OIL PRICE · ×4 IN MONTHS','#f6d08a',15,'letter-spacing="1.5"')},
   {z:1.15,s:R(-20,975,1640,25+DEEP,'#140c06')+cars()},
 ]}},
 apollo(r){const e=vg([[0,'#4c8df0'],[1,'#123a86']]);let moon='';[[260,840,160,26],[520,900,220,34],[1080,850,140,22],[1260,930,200,30],[820,960,120,18]].forEach(([a,b,w,h])=>moon+=E(a,b,w/2,h/2,'#2e2c29','opacity=".55"')+E(a+3,b+3,w/2-8,h/2-5,'#5e5a54','opacity=".6"'));
   const lx=1000,ly=640;let lm=P(`M ${lx+10} ${ly} L ${lx+50} ${ly-40} L ${lx+110} ${ly-40} L ${lx+140} ${ly} Z`,'#b9b4aa')+R(lx,ly,150,62,'#c9a24a','rx="3"')+R(lx+8,ly+10,134,6,'#8e6e2a')+R(lx+62,ly-30,22,14,'#20232b','rx="3"');
   lm+=S(`M ${lx+10} ${ly+40} L ${lx-30} ${ly+130} M ${lx+140} ${ly+40} L ${lx+180} ${ly+130} M ${lx+40} ${ly+50} L ${lx+28} ${ly+130} M ${lx+110} ${ly+50} L ${lx+122} ${ly+130}`,'#d8d2c4',4);[lx-44,lx+166,lx+14,lx+108].forEach(x=>lm+=E(x+15,ly+132,16,5,'#d8d2c4'));lm+=R(lx+240,ly-10,3,140,'#e8e4da')+R(lx+243,ly-10,60,38,'#e8e4da','opacity=".9"');
   return {bg:'linear-gradient(#010208 0%,#0b1224 100%)',layers:[
   {z:.1,s:stars(r,200,760)},
   {z:.22,s:`<defs>${e.def}<clipPath id="ec"><circle cx="1260" cy="230" r="118"/></clipPath></defs><g clip-path="url(#ec)">${C(1260,230,118,`url(#${e.id})`)}${[[1200,170,60,13],[1270,215,55,11],[1210,262,45,10],[1300,280,40,9]].map(([a,b,w,h])=>E(a,b,w,h,'#fff','opacity=".75"')).join('')}${C(1330,200,160,'#000','opacity=".62"')}</g>`+C(1260,230,130,'none','stroke="#7fb2ff" stroke-opacity=".25" stroke-width="6"')},
   {z:.75,s:E(800,1300,1400,560,'#77736c')+E(800,1300,1380,540,'#8f8a82')+moon+lm},
   {z:1.25,s:(()=>{let g='';for(let i=0;i<7;i++){g+=E(880-i*80,920+i*14,10,5,'#2a2826','opacity=".7"')+E(856-i*80,934+i*14,10,5,'#2a2826','opacity=".7"')}return g})()},
 ]}},
 march(r){return {bg:'linear-gradient(#1c2632 0%,#5b6b79 55%,#c3b69c 100%)',layers:[
   {z:.1,s:C(1180,420,70,'#f3e2bc','opacity=".5"')},
   {z:.25,s:P('M 1160 120 L 1200 120 L 1214 760 L 1146 760 Z','#3a4552')+P('M 1160 120 L 1180 82 L 1200 120 Z','#3a4552')+skyline(r,{base:780,minH:20,maxH:70,wMin:80,wMax:160,fill:'#3a4552'})},
   {z:.45,s:R(-20,780,1640,60,'#a8b4b8','opacity=".55"')+R(1150,790,60,40,'#3a4552','opacity=".35"')},
   {z:.7,s:crowd(r,{base:900,f:'#1a2028',s:.85,step:18,signs:['JOBS','FREEDOM','EQUAL RIGHTS','VOTE'],signP:.11,hats:'wide',hatP:.15})},
   {z:1.2,s:crowd(r,{base:1010,f:'#0c1016',s:1.5,step:24,signs:['FREEDOM NOW','JOBS'],signP:.06})},
 ]}},
 ww2end(r){return {bg:'linear-gradient(#160706 0%,#55190f 45%,#b4532c 80%,#e39256 100%)',layers:[
   {z:.1,s:C(1180,520,300,'#f4b26b','opacity=".12"')+C(1180,520,150,'#f6b873','opacity=".9"')},
   {z:.3,s:smoke(r,800,640,'#2a1612',.14)+smoke(r,1100,600,'#2a1612',.12)+jag(r,1000,90,180,320,'#3b1610')},
   {z:.65,s:jag(r,1000,150,90,210,'#170807')+[[860,880],[930,860],[1300,850],[1360,880]].map(([x,y])=>R(x,y,24,40,'#e39256','rx="12" opacity=".35"')).join('')},
   {z:.9,s:[[1150,220,1],[1220,260,.8],[1280,210,.7],[1100,280,.6]].map(([x,y,s])=>S(`M ${x} ${y} q ${12*s} -10 ${24*s} 0 q ${12*s} -10 ${24*s} 0`,'#ffe9d2',2.4,'opacity=".9"')).join('')},
   {z:1.3,s:(()=>{let g=R(-20,975,1640,25+DEEP,'#0d0505');for(let i=0;i<50;i++)g+=R(r()*1600,950+r()*40,8+r()*28,6+r()*14,'#0d0505',`transform="rotate(${n1(r()*60-30)} 800 970)"`);return g})()},
 ]}},
 bretton(r){return {bg:'linear-gradient(#0e1918 0%,#1f322e 100%)',layers:[
   {z:.1,s:`<g fill="none" stroke="#e8b34e" stroke-opacity=".18" stroke-width="1.5" class="spin" style="transform-origin:1200px 420px">${C(1200,420,300,'none')}${[220,140,60].map(rx=>E(1200,420,rx,300,'none')).join('')}</g>`},
   {z:.35,s:columns(860,640,960,'#16241f','#2e443c')},
   {z:.6,s:chart([.48,.5,.49,.5,.5,.51,.5,.5,.51,.5,.51,.5],{x0:-20,x1:1620,top:250,bot:700,col:'#e8b34e'})+T(1030,330,'$35 = 1 TROY OUNCE OF GOLD','#f2c062',15,'letter-spacing="1.5"')},
   {z:1.15,s:(()=>{let g='';const bar=(x,y)=>P(`M ${x} ${y} L ${x+120} ${y} L ${x+108} ${y-34} L ${x+12} ${y-34} Z`,'#c9952e')+P(`M ${x+12} ${y-34} L ${x+108} ${y-34} L ${x+98} ${y-40} L ${x+22} ${y-40} Z`,'#f2c062');for(let row=0;row<4;row++)for(let i=0;i<5-row;i++)g+=bar(1060+i*112+row*56,1000-row*36);return g+R(-20,1000,1640,DEEP,'#c9952e')})()},
 ]}},
 transistor(r){const traces=(op,col,n,w)=>{let g='';for(let i=0;i<n;i++){let x=r()*1600,y=r()*1000,d=`M ${n1(x)} ${n1(y)}`;for(let k=0;k<4;k++){if(k%2){y+=(r()-.5)*360}else{x+=(r()-.3)*360}d+=` L ${n1(x)} ${n1(y)}`}g+=S(d,col,w,`opacity="${op}"`)+C(x,y,w*2.2,col,`opacity="${op}"`)}return g};
   return {bg:'linear-gradient(#071010 0%,#0f221d 100%)',layers:[
   {z:.15,s:traces(.18,'#5ccbc4',40,2)},
   {z:.45,s:traces(.45,'#5ccbc4',16,3)},
   {z:.75,s:`<g transform="translate(1180 360)">${R(-90,0,180,170,'#c9c2b0','rx="10"')+R(-100,150,200,24,'#8a8474','rx="6"')+R(-70,174,10,360+DEEP,'#d8d2c4')+R(-5,174,10,360+DEEP,'#d8d2c4')+R(60,174,10,360+DEEP,'#d8d2c4')+C(0,70,40,'#5ccbc4','opacity=".2" class="blink"')+T(0,82,'1947','#2a2a26',28,'text-anchor="middle"')}</g>`},
 ]}},
 partition(r){let tr='';const tx=640;for(let i=0;i<4;i++){const x=tx+i*250;tr+=R(x,700,236,150,'#2a160c','rx="8"')+C(x+40,870,22,'#2a160c')+C(x+196,870,22,'#2a160c');for(let k=0;k<5;k++)tr+=R(x+18+k*44,730,28,36,'#e8a060','opacity=".55"')}tr+=R(-20,890,1640,10,'#1a0d06');
   return {bg:'linear-gradient(#2a1a12 0%,#7a4a2a 55%,#d8a060 100%)',layers:[
   {z:.1,s:C(1300,420,90,'#f8d090','opacity=".7"')},
   {z:.3,s:hills(r,820,50,'#6a3c22')},
   {z:.65,s:tr+crowd(r,{x0:650,x1:1630,base:702,f:'#2a160c',s:.6,step:16,bundle:.3})},
   {z:1.2,s:crowd(r,{base:1010,f:'#120804',s:1.5,step:28,bundle:.55,staff:.2})},
 ]}},
 ww2start(r){const bm=vg([[0,'#e8ecff',0],[1,'#e8ecff',.25]]);let pl='';[[1000,200],[1080,250],[920,250],[1160,300],[840,300],[1240,350],[760,350]].forEach(([x,y])=>pl+=plane(x,y,.9,'#0a0b10'));
   return {bg:'linear-gradient(#05060b 0%,#171a28 60%,#3a2f2a 100%)',layers:[
   {z:.1,s:stars(r,60,500)+`<defs>${bm.def}</defs>`+P('M 700 1000 L 760 1000 L 1120 0 L 1040 0 Z',`url(#${bm.id})`)+P('M 1300 1000 L 1360 1000 L 1000 0 L 920 0 Z',`url(#${bm.id})`)},
   {z:.4,s:pl},
   {z:.7,s:skyline(r,{base:1000,minH:80,maxH:220,wMin:50,wMax:110,fill:'#0b0c12',win:'#f0c070',winP:.04})},
   {z:1.2,s:R(-20,960,1640,40+DEEP,'#050507')},
 ]}},
 crash1929(r){let tape='';for(let i=0;i<22;i++){const x=600+r()*1000,y=-100+r()*400,len=240+r()*320,a=20+r()*30;tape+=S(`M ${n1(x)} ${n1(y)} c ${n1(a)} ${n1(len*.25)} ${n1(-a)} ${n1(len*.5)} 0 ${n1(len*.75)} c ${n1(a)} ${n1(len*.1)} ${n1(a)} ${n1(len*.2)} 0 ${n1(len*.25)}`,'#efe2c6',2+r()*2,`opacity="${n1(.25+r()*.45)}"`)}
   let grain='';for(let i=0;i<14;i++)grain+=R(r()*1600,0,1,1000,'#f3e3c3',`opacity="${n1(.04+r()*.05)}"`);
   return {bg:'linear-gradient(#17110c 0%,#3a2c1f 60%,#5c4630 100%)',layers:[
   {z:0,s:grain},
   {z:.4,s:columns(860,640,940,'#241b14','#4a3a2a')},
   {z:.8,s:`<g class="drift">${tape}</g>`},
   {z:1.25,s:crowd(r,{base:1010,f:'#0e0a07',s:1.25,step:22,hats:'bowler',hatP:.75})},
 ]}},
 penicillin(r){const dish=(cx,cy,rad,mould)=>{let g=C(cx,cy,rad,'#e6ddc0','opacity=".18" stroke="#efe6d2" stroke-opacity=".6" stroke-width="5"')+C(cx,cy,rad-14,'#d9c99a','opacity=".22"');
     for(let i=0;i<260;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*(rad-24),x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d;if(mould&&Math.hypot(x-mould[0],y-mould[1])<mould[2]+70)continue;g+=C(x,y,2+r()*5,'#f0e2b0',`opacity="${n1(.45+r()*.4)}"`)}
     if(mould)g+=C(mould[0],mould[1],mould[2]+70,'#1f2a24','opacity=".25" stroke="#cfe7c8" stroke-opacity=".25" stroke-dasharray="4 8"')+C(mould[0],mould[1],mould[2],'#7aa86a','opacity=".85"')+C(mould[0]-14,mould[1]-10,mould[2]*.5,'#a9cf8a','opacity=".8"');return g};
   return {bg:'linear-gradient(#0e1412 0%,#1f2a24 100%)',layers:[
   {z:.15,s:stars(r,40,1000,'#cfe7c8')},
   {z:.55,s:dish(1130,450,330,[1060,400,60])},
   {z:1.15,s:dish(1540,960,240,null)},
 ]}},
 saltmarch(r){let line='';for(let i=0;i<34;i++){const t=i/33,x=560+t*1100,b=830+Math.sin(t*3)*12;line+=person(x,b,.55-t*.12,'#3a2416',{staff:r()<.5,hat:null})}
   return {bg:'linear-gradient(#e6bf84 0%,#f0d6a4 70%,#f4e2bc 100%)',layers:[
   {z:.1,s:C(1300,300,80,'#fff2cc','opacity=".95"')},
   {z:.3,s:R(-20,700,1640,80,'#6f8fa0','opacity=".85"')+R(-20,700,1640,6,'#a8c0c8','opacity=".8"')},
   {z:.6,s:R(-20,780,1640,220+DEEP,'#d4b07a')+line},
   {z:1.15,s:hills(r,1000,70,'#a8814e',220)+person(1350,1010,1.6,'#3a2416',{staff:true})+person(1460,1020,1.4,'#3a2416',{staff:false})},
 ]}},
 ww1(r){let wire='';for(let x=-20;x<1650;x+=140)wire+=R(x,820,6,90,'#1a1610');let d='M -20 840';for(let x=-20;x<1660;x+=14)d+=` a 7 7 0 1 1 ${n1(14)} ${n1(Math.sin(x)*2)}`;wire+=S(d,'#1a1610',2);
   let pop='';for(let i=0;i<60;i++){const x=r()*1600,h=60+r()*120,y=1000;pop+=S(`M ${n1(x)} ${y+DEEP} Q ${n1(x+6)} ${n1(y-h/2)} ${n1(x+4)} ${n1(y-h)}`,'#2a3a20',2.5)+C(x+4,y-h,9+r()*5,'#c8322a')+C(x+4,y-h,3,'#1a0a08')}
   return {bg:'linear-gradient(#2a2620 0%,#6b5e4a 60%,#a89574 100%)',layers:[
   {z:.1,s:`<g class="blink">${C(1200,240,14,'#fff2c8')+C(1200,240,60,'#fff2c8','opacity=".2"')}</g>`+S('M 1080 640 Q 1140 300 1200 240','#fff2c8',2,'opacity=".3" stroke-dasharray="6 10"')},
   {z:.35,s:hills(r,760,60,'#4e4434')+smoke(r,900,640,'#3a332a',.2,6)},
   {z:.65,s:P(`M -20 ${900+DEEP} L -20 860 ${Array.from({length:14},(_,i)=>`L ${i*120+60} ${i%2?880:860} L ${i*120+120} ${i%2?860:880}`).join(' ')} L 1660 ${900+DEEP} Z`,'#2a241a')+R(-20,880,1640,20,'#16120c')+wire},
   {z:1.25,s:pop},
 ]}},
 hyper(r){let notes='';for(let i=0;i<34;i++){const x=600+r()*1000;notes+=`<g class="fall" style="animation-duration:${n1(10+r()*10)}s;animation-delay:-${n1(r()*18)}s">${R(x,-80,90,46,'#cdbf9a','rx="2" opacity=".85"')+R(x+6,-74,78,34,'none','stroke="#6b5a3a" stroke-width="1.5"')+T(x+45,-50,'1 000 000','#4a3a22',10,'text-anchor="middle"')}</g>`}
   let stacks='';for(let i=0;i<6;i++){const x=980+i*100,h=140+r()*220;for(let y=0;y<h;y+=12)stacks+=R(x+(r()-.5)*6,1000-y-12,88,10,y%24?'#b9aa82':'#a8986e','rx="1"')}
   return {bg:'linear-gradient(#1d1712 0%,#3d3022 100%)',layers:[
   {z:.05,s:grid('#f3e3c3',.05)},
   {z:.5,s:chart([.02,.02,.03,.03,.04,.05,.06,.08,.11,.16,.24,.36,.55,.82,1.25],{x0:-20,x1:1620,top:300,bot:760,col:'#e8b34e'})+T(980,380,'1 USD = 4,200,000,000,000 MARKS','#f2c062',15,'letter-spacing="1.5"')},
   {z:.9,s:notes},
   {z:1.2,s:stacks+R(-20,1000,1640,DEEP,'#14100c')},
 ]}},
 relativity(r){let g='';const cx=1150,cy=470,M=90;const warp=(x,y)=>{const dx=x-cx,dy=y-cy,d=Math.hypot(dx,dy)+1,f=Math.min(M*M*1.4/d,d*.75);return [x-dx/d*f,y-dy/d*f]};
   for(let y=-40;y<=1040;y+=60){let d='';for(let x=500;x<=1700;x+=20){const p=warp(x,y);d+=(d?' L ':'M ')+n1(p[0])+' '+n1(p[1])}g+=S(d,'#5ccbc4',1.3,'opacity=".35"')}
   for(let x=500;x<=1700;x+=60){let d='';for(let y=-40;y<=1040;y+=20){const p=warp(x,y);d+=(d?' L ':'M ')+n1(p[0])+' '+n1(p[1])}g+=S(d,'#5ccbc4',1.3,'opacity=".35"')}
   return {bg:'linear-gradient(#05050c 0%,#14122a 100%)',layers:[
   {z:.1,s:stars(r,160,1000)},
   {z:.4,s:g},
   {z:.6,s:C(cx,cy,M,'#f6c06a')+C(cx,cy,M+40,'#f6c06a','opacity=".15"')+S(`M 1560 120 Q ${cx+60} ${cy-M-70} 620 ${cy-40}`,'#fff2cc',2.5,'stroke-dasharray="10 10" opacity=".85"')+C(1560,120,6,'#fff')+T(1440,100,'STARLIGHT BENDS · 1919','#fff2cc',14,'letter-spacing="1.5" opacity=".8"')},
 ]}},
 flu(r){let ward='';for(let i=0;i<6;i++)ward+=R(620+i*170,230,90,300,'#f0e6c8','rx="45" opacity=".22"');let beds='';for(let i=0;i<5;i++){const x=640+i*200;beds+=R(x,760,160,30,'#e8e2d0','rx="6"')+R(x,730,46,30,'#f4efe0','rx="8"')+R(x,790,6,60+DEEP,'#2a2620')+R(x+154,790,6,60+DEEP,'#2a2620')+R(x-6,700,6,150+DEEP,'#2a2620')}
   return {bg:'linear-gradient(#1c1a18 0%,#3a362f 100%)',layers:[
   {z:.25,s:ward+R(-20,560,1640,440+DEEP,'#2e2a24')},
   {z:.6,s:beds},
   {z:1.2,s:crowd(r,{x0:-20,x1:1620,base:1010,f:'#0e0c0a',s:1.45,step:58,mask:'#e8e2d0',maskP:.85,hats:'wide',hatP:.2})},
 ]}},
 tsushima(r){let waves='';for(let i=0;i<70;i++){const x=r()*1600,y=820+r()*180;waves+=S(`M ${n1(x)} ${n1(y)} q 20 -8 40 0`,'#cdd6dc',2,`opacity="${n1(.15+r()*.35)}"`)}
   return {bg:'linear-gradient(#18202e 0%,#5a6a78 55%,#c4b49a 100%)',layers:[
   {z:.1,s:C(1220,560,70,'#f2dcb0','opacity=".6"')},
   {z:.3,s:smoke(r,1000,620,'#2a3038',.2,7)+smoke(r,1360,640,'#2a3038',.18,7)+ship(900,700,.45,'#3a4450')+ship(1250,690,.4,'#3a4450')},
   {z:.6,s:R(-20,720,1640,280+DEEP,'#3a4a58')+ship(760,760,1,'#141a22')},
   {z:1.2,s:R(-20,900,1640,100+DEEP,'#2a3644','opacity=".7"')+waves},
 ]}},
 fordT(r){let roof='';for(let x=760;x<1600;x+=80)roof+=P(`M ${x} 640 L ${x+60} 580 L ${x+80} 580 L ${x+80} 640 Z`,'#2a2620');
   return {bg:'linear-gradient(#1b1d22 0%,#3c3a36 60%,#8a7a62 100%)',layers:[
   {z:.1,s:C(1300,300,60,'#e8d8b0','opacity=".35"')},
   {z:.3,s:roof+R(760,640,860,360+DEEP,'#2a2620')+chimney(900,640,200,34,'#2a2620')+chimney(1000,640,260,40,'#2a2620')+smoke(r,1020,360,'#3a3630',.25,6)+(()=>{let w='';for(let x=790;x<1600;x+=60)w+=R(x,690,34,50,'#e8c880','opacity=".35"');return w})()},
   {z:.6,s:chart([.04,.06,.09,.14,.22,.33,.5,.7,.92],{x0:-20,x1:1620,top:260,bot:760,col:'#e8b34e'})+T(1000,330,'MODEL T SALES · 1908 → 1916','#f2c062',15,'letter-spacing="1.5"')},
   {z:1.15,s:R(-20,980,1640,20+DEEP,'#100e0c')+[500,700,900,1100,1300,1500].map(x=>car(x,982,1.1,'#100e0c')).join('')},
 ]}},
 flight(r){const bp=`<g class="hover">${R(0,0,260,10,'#2a2018','rx="3"')+R(10,46,240,10,'#2a2018','rx="3"')+[30,90,170,230].map(x=>R(x,8,3,40,'#2a2018')).join('')+R(100,24,90,14,'#2a2018','rx="4"')+R(-90,26,90,4,'#2a2018')+R(-110,10,20,36,'#2a2018')+C(120,30,10,'#2a2018')}</g>`;
   return {bg:'linear-gradient(#8fb0c4 0%,#c8d4cc 55%,#e4d2a8 100%)',layers:[
   {z:.1,s:E(1300,200,180,40,'#fff','opacity=".5"')+E(1000,150,120,28,'#fff','opacity=".4"')},
   {z:.3,s:R(-20,720,1640,60,'#7a96a4','opacity=".8"')},
   {z:.55,s:hills(r,820,90,'#d8bf8a',260)+`<g transform="translate(980 420)">${bp}</g>`+S('M 920 820 L 900 600','#2a2018',2,'opacity=".25" stroke-dasharray="4 8"')},
   {z:1.15,s:hills(r,1000,120,'#c4a26e',300)+person(1300,980,1.5,'#3a2c20',{hat:'bowler'})},
 ]}},
 suffrage(r){return {bg:'linear-gradient(#2a2230 0%,#6a5a70 55%,#c9b0a0 100%)',layers:[
   {z:.1,s:C(1250,380,60,'#f4e2c8','opacity=".5"')},
   {z:.3,s:R(1000,560,360,440+DEEP,'#3a3040')+C(1180,560,90,'#3a3040')+R(1176,440,8,40,'#3a3040')+R(940,620,60,380+DEEP,'#3a3040')+R(1360,620,60,380+DEEP,'#3a3040')+skyline(r,{base:900,minH:60,maxH:160,wMin:80,wMax:150,fill:'#3a3040'})},
   {z:.65,s:R(820,700,600,70,'#efe6d2','rx="4"')+T(1120,746,'VOTES FOR WOMEN','#2a1e2c',28,'text-anchor="middle" letter-spacing="3"')+R(816,700,6,200,'#1e1622')+R(1418,700,6,200,'#1e1622')+crowd(r,{base:920,f:'#1e1622',s:.95,step:22,dress:.85,hats:'wide',hatP:.6})},
   {z:1.2,s:crowd(r,{base:1012,f:'#0f0a12',s:1.55,step:28,dress:.9,hats:'wide',hatP:.7})},
 ]}},
};

