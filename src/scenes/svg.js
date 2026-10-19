// Small SVG-string helpers used by the scene generators.
// Scenes are drawn in a 1600x1000 viewBox, bottom-anchored (preserveAspectRatio xMidYMax slice).
const RNG = s => { let x = (s >>> 0) % 2147483647 || 1; return () => (x = (x * 16807) % 2147483647) / 2147483647; };
const n1 = v => (+v).toFixed(1);
const R = (x,y,w,h,f,o='') => `<rect x="${n1(x)}" y="${n1(y)}" width="${n1(w)}" height="${n1(h)}" fill="${f}" ${o}/>`;
const C = (x,y,r,f,o='') => `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(r)}" fill="${f}" ${o}/>`;
const E = (x,y,rx,ry,f,o='') => `<ellipse cx="${n1(x)}" cy="${n1(y)}" rx="${n1(rx)}" ry="${n1(ry)}" fill="${f}" ${o}/>`;
const P = (d,f,o='') => `<path d="${d}" fill="${f}" ${o}/>`;
const S = (d,s,w=2,o='') => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${o}/>`;
const T = (x,y,t,f,sz,o='') => `<text x="${n1(x)}" y="${n1(y)}" fill="${f}" font-size="${sz}" font-family="IBM Plex Mono, monospace" font-weight="500" ${o}>${t}</text>`;
let UID = 0;
const vg = (stops) => { const id='g'+(UID++); return {id, def:`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o,c,a=1])=>`<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</linearGradient>`}; };
const rg = (stops) => { const id='g'+(UID++); return {id, def:`<radialGradient id="${id}">${stops.map(([o,c,a=1])=>`<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</radialGradient>`}; };
const DEEP = 340; // everything bottom-anchored extends below the frame so parallax never shows a gap

function stars(r,n,maxY=700,col='#fff'){let s='';for(let i=0;i<n;i++){const z=.6+r()*1.4;s+=C(r()*1600,r()*maxY,z,col,`opacity="${n1(.25+r()*.65)}" ${r()<.35?`class="tw" style="animation-delay:${n1(r()*3)}s"`:''}`)}return s}
function skyline(r,{base=1000,minH=80,maxH=240,wMin=40,wMax=110,gap=4,fill,win=null,winP=.25,x0=-30,x1=1630,ramp=0}={}){
  let s='',x=x0;while(x<x1){const w=wMin+r()*(wMax-wMin);let h=minH+r()*(maxH-minH);h+=ramp*(x/1600)*maxH;
    s+=R(x,base-h,w,h+DEEP,fill);if(r()<.25)s+=R(x+w*.4,base-h-18,w*.12,18,fill);
    if(win){for(let wy=base-h+14;wy<base-8;wy+=15)for(let wx=x+7;wx<x+w-7;wx+=12)if(r()<winP)s+=R(wx,wy,4,6,win,`opacity="${n1(.35+r()*.6)}"${r()<.04?' class="blink"':''}`)}
    x+=w+gap}return s}
function hills(r,base,amp,fill,seg=160){let d=`M -40 ${base+DEEP} L -40 ${base}`;for(let x=-40;x<1680;x+=seg){d+=` Q ${x+seg/2} ${n1(base-amp*(.4+r()))} ${x+seg} ${n1(base-r()*amp*.3)}`}return P(d+` L 1680 ${base+DEEP} Z`,fill)}
function jag(r,base,seg,minH,maxH,fill){let d=`M -40 ${base+DEEP}`,x=-40;while(x<1680){const h=minH+r()*(maxH-minH),w=seg*(.5+r());d+=` L ${n1(x)} ${n1(base-h)} L ${n1(x+w*.3)} ${n1(base-h-r()*34)} L ${n1(x+w*.6)} ${n1(base-h+r()*44)} L ${n1(x+w)} ${n1(base-h+r()*20)}`;x+=w}return P(d+` L ${n1(x)} ${base+DEEP} Z`,fill)}
function person(x,base,s,f,o={}){const hy=base-64*s;let g='';
  if(o.dress)g+=P(`M ${n1(x-9*s)} ${n1(base-50*s)} L ${n1(x+9*s)} ${n1(base-50*s)} L ${n1(x+20*s)} ${n1(base+DEEP)} L ${n1(x-20*s)} ${n1(base+DEEP)} Z`,f);
  else g+=R(x-13*s,base-52*s,26*s,52*s+DEEP,f,`rx="${n1(11*s)}"`);
  g+=C(x,hy,9.5*s,f);
  if(o.hat==='bowler'){g+=E(x,hy-5*s,15*s,3.5*s,f)+R(x-9*s,hy-16*s,18*s,12*s,f,`rx="${n1(6*s)}"`)}
  if(o.hat==='wide'){g+=E(x,hy-6*s,20*s,4*s,f)+E(x,hy-10*s,10*s,7*s,f)}
  if(o.mask)g+=R(x-6*s,hy+1*s,12*s,6*s,o.mask,`rx="${n1(2*s)}"`);
  if(o.arm)g+=S(`M ${n1(x+10*s)} ${n1(base-44*s)} L ${n1(x+20*s)} ${n1(base-92*s)}`,f,6*s);
  if(o.bundle)g+=R(x-12*s,hy-24*s,24*s,14*s,f,`rx="${n1(5*s)}"`);
  if(o.staff)g+=S(`M ${n1(x+14*s)} ${n1(base-80*s)} L ${n1(x+18*s)} ${n1(base)}`,f,3*s);
  if(o.sign)g+=S(`M ${n1(x+12*s)} ${n1(base-40*s)} L ${n1(x+12*s)} ${n1(base-110*s)}`,f,3*s)+R(x-22*s,base-150*s,68*s,40*s,o.signBg||'#efe6d2',`rx="${n1(3*s)}"`)+T(x+12*s,base-124*s,o.sign,f,13*s,'text-anchor="middle"');
  return g}
function crowd(r,{x0=-20,x1=1620,base=1000,f,s=1,step=22,hats=null,hatP=.6,dress=0,mask=null,maskP=0,arm=0,signs=null,signP=.07,bundle=0,staff=0,signBg}={}){
  let g='',x=x0;while(x<x1){const k=s*(.82+r()*.36),b=base-r()*14*s;
    g+=person(x,b,k,f,{hat:hats&&r()<hatP?hats:null,dress:dress&&r()<dress,mask:mask&&r()<maskP?mask:null,arm:arm&&r()<arm,bundle:bundle&&r()<bundle,staff:staff&&r()<staff,sign:signs&&r()<signP?signs[Math.floor(r()*signs.length)]:null,signBg});
    x+=step*s*(.8+r()*.7)}return g}
function smoke(r,cx,cy,f,op=.25,n=9){let g='';for(let i=0;i<n;i++){const rr=50+i*20;g+=E(cx+Math.sin(i*1.3)*26+i*12,cy-i*48,rr,rr*.78,f,`opacity="${op}"`)}return `<g class="drift" style="animation-delay:-${n1(r()*8)}s">${g}</g>`}
function falling(r,n,f,{x0=0,x1=1600,w=[10,26],h=[18,40],op=[.3,.85],rx=1}={}){let g='';for(let i=0;i<n;i++){const ww=w[0]+r()*(w[1]-w[0]),hh=h[0]+r()*(h[1]-h[0]);g+=R(x0+r()*(x1-x0),-60-r()*200,ww,hh,f,`rx="${rx}" opacity="${n1(op[0]+r()*(op[1]-op[0]))}" class="fall" style="animation-duration:${n1(9+r()*10)}s;animation-delay:-${n1(r()*18)}s"`)}return g}
function chart(vals,{x0=0,x1=1600,top=260,bot=720,col='#e8b34e',dots=false}){
  const pts=vals.map((v,i)=>[x0+(x1-x0)*i/(vals.length-1),bot-(bot-top)*v]);
  const d='M '+pts.map(p=>p.map(n1).join(' ')).join(' L ');const g=vg([[0,col,.28],[1,col,0]]);
  let s=`<defs>${g.def}</defs>`+P(d+` L ${x1} ${bot+DEEP} L ${x0} ${bot+DEEP} Z`,`url(#${g.id})`,'opacity=".9"');
  s+=S(d,col,18,'opacity=".14"')+S(d,col,4,'pathLength="1" class="draw" stroke-dasharray="1" stroke-dashoffset="0"');
  if(dots)pts.forEach((p,i)=>{if(i%3===0)s+=C(p[0],p[1],5,col)});return s}
function grid(col='#fff',op=.05){let s='';for(let y=120;y<1000;y+=64)s+=R(0,y,1600,1,col,`opacity="${op}"`);for(let x=40;x<1600;x+=96)s+=R(x,0,1,1000,col,`opacity="${op*.6}"`);return s}
function palm(x,base,s,f){let g=S(`M ${x} ${base+DEEP} L ${x} ${base} Q ${x+10*s} ${base-120*s} ${x+30*s} ${base-230*s}`,f,9*s);const tx=x+30*s,ty=base-230*s;
  [[-110,30],[-80,-20],[-30,-50],[30,-48],[80,-18],[110,34],[-60,60],[60,62]].forEach(([dx,dy])=>{g+=P(`M ${n1(tx)} ${n1(ty)} Q ${n1(tx+dx*s*.5)} ${n1(ty+dy*s-26*s)} ${n1(tx+dx*s)} ${n1(ty+dy*s)} Q ${n1(tx+dx*s*.5)} ${n1(ty+dy*s*.5-6*s)} ${n1(tx)} ${n1(ty)} Z`,f)});return g}
function heli(x,y,s,f){return `<g class="hover">${E(x,y,46*s,20*s,f)+R(x+30*s,y-6*s,90*s,9*s,f)+R(x+112*s,y-24*s,6*s,30*s,f)+R(x-70*s,y-28*s,150*s,3*s,f)+R(x-2*s,y-28*s,4*s,10*s,f)+R(x-30*s,y+22*s,64*s,3*s,f)}</g>`}
function plane(x,y,s,f){return E(x,y,52*s,8*s,f)+P(`M ${n1(x-6*s)} ${n1(y)} L ${n1(x-26*s)} ${n1(y+42*s)} L ${n1(x-12*s)} ${n1(y+42*s)} L ${n1(x+14*s)} ${n1(y)} L ${n1(x-12*s)} ${n1(y-42*s)} L ${n1(x-26*s)} ${n1(y-42*s)} Z`,f)+P(`M ${n1(x+38*s)} ${n1(y)} L ${n1(x+52*s)} ${n1(y-16*s)} L ${n1(x+52*s)} ${n1(y+16*s)} Z`,f)}
function ship(x,base,s,f){return P(`M ${n1(x)} ${n1(base)} L ${n1(x+400*s)} ${n1(base)} L ${n1(x+370*s)} ${n1(base+30*s)} L ${n1(x+30*s)} ${n1(base+30*s)} Z`,f)+R(x+120*s,base-40*s,150*s,40*s,f)+R(x+160*s,base-80*s,60*s,40*s,f)+R(x+140*s,base-120*s,22*s,80*s,f)+R(x+230*s,base-110*s,22*s,70*s,f)+R(x+60*s,base-14*s,60*s,14*s,f)+R(x+290*s,base-14*s,60*s,14*s,f)+R(x+20*s,base-20*s,80*s,4*s,f)+R(x+300*s,base-20*s,90*s,4*s,f)+R(x+188*s,base-150*s,3*s,70*s,f)}
function columns(x0,w,base,dark,light){let s=P(`M ${x0-20} ${base-470} L ${x0+w/2} ${base-560} L ${x0+w+20} ${base-470} Z`,dark)+R(x0-30,base-470,w+60,46,dark)+R(x0-20,base-424,w+40,12,light);
  for(let i=0;i<6;i++){const cx=x0+26+i*((w-82)/5);s+=R(cx-7,base-412,46,16,dark)+R(cx,base-396,32,360,light,'opacity=".9"');for(let k=1;k<4;k++)s+=R(cx+k*8,base-390,1.6,350,dark,'opacity=".45"');s+=R(cx-7,base-38,46,14,dark)}
  for(let j=0;j<4;j++)s+=R(x0-30-j*20,base-24+j*14,w+60+j*40,14+DEEP*(j===3),j%2?dark:light);return s}
function car(x,base,s,f){return R(x,base-34*s,110*s,22*s,f,`rx="${n1(4*s)}"`)+R(x+22*s,base-70*s,52*s,40*s,f,`rx="${n1(4*s)}"`)+R(x+18*s,base-74*s,60*s,6*s,f)+C(x+20*s,base-10*s,14*s,f)+C(x+90*s,base-10*s,14*s,f)+C(x+20*s,base-10*s,6*s,'#9a8a70')+C(x+90*s,base-10*s,6*s,'#9a8a70')}
function derrick(x,base,h,f){return S(`M ${x-40} ${base} L ${x} ${base-h} L ${x+40} ${base} M ${x-30} ${base-h*.25} L ${x+30} ${base-h*.25} M ${x-20} ${base-h*.5} L ${x+20} ${base-h*.5} M ${x-30} ${base-h*.25} L ${x+20} ${base-h*.5} M ${x+30} ${base-h*.25} L ${x-20} ${base-h*.5} M ${x-12} ${base-h*.7} L ${x+12} ${base-h*.7}`,f,4)+R(x-60,base-6,120,6+DEEP,f)}
function crane(x,base,h,f){return S(`M ${x} ${base} L ${x} ${base-h} M ${x-60} ${base-h+10} L ${x+200} ${base-h+10} M ${x} ${base-h-30} L ${x-60} ${base-h+10} M ${x} ${base-h-30} L ${x+200} ${base-h+10} M ${x+150} ${base-h+10} L ${x+150} ${base-h+90}`,f,4)+R(x-70,base-h+12,40,26,f)+R(x+138,base-h+90,24,18,f)}
function chimney(x,base,h,w,f){return R(x,base-h,w,h+DEEP,f)+R(x-4,base-h,w+8,10,f)}


export { RNG, n1, R, C, E, P, S, T, vg, rg, DEEP, stars, skyline, hills, jag, person, crowd, smoke, falling, chart, grid, palm, heli, plane, ship, columns, car, derrick, crane, chimney };
