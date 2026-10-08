const $=(q,e=document)=>e.querySelector(q),app=$("#app");
const cats={tech:["Technical Events","TECHNICAL"],non:["Non-Technical Events","NON-TECHNICAL"]};
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const TBA='<span class="dim">TO BE ANNOUNCED</span>',v=x=>x?esc(x):TBA;
const art=e=>e.img?`<img src="${esc(e.img)}" alt="${esc(e.name)}">`:`<svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(e.name)}"><rect width="200" height="120" fill="#2a0813"/><path d="M8 28V8h20M172 8h20v20M192 92v20h-20M28 112H8V92" stroke="#ffc933" stroke-width="2" fill="none"/><text x="100" y="78" text-anchor="middle" font-family="Bowlby One,Impact,sans-serif" font-size="60" fill="#fde3c1">${esc(e.glyph)}</text></svg>`;
const face=i=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5c1228"/><stop offset="1" stop-color="#2a0813"/></linearGradient></defs><rect width="160" height="200" fill="url(#g)"/><path d="M0 200c0-42 30-62 80-62s80 20 80 62z" fill="${["#ffc933","#fde3c1","#e8a21d","#e0392b"][i%4]}" opacity=".85"/><circle cx="80" cy="82" r="34" fill="#fde3c1" opacity=".9"/><path d="M44 80c0-30 20-44 36-44s36 14 36 44c-8-16-20-24-36-24s-28 8-36 24z" fill="${["#6b1228","#2a0813","#8d0f16","#3a0b1a"][(i+1)%4]}"/></svg>`);
const people=(a,c)=>`<div class="people ${c}">${a.map((p,i)=>{const photo=p.photo||face(i);return `<figure class="person"><div class="av"><img src="${esc(photo)}" alt="${esc(p.name)}" draggable="false"></div><figcaption><b>${esc(p.name)}</b><span>${esc(p.role)}</span></figcaption></figure>`}).join("")}</div>`;
const organizers=a=>`<div class="organizer-grid">${a.map((p,i)=>`<article class="organizer-card"><span class="organizer-index">${String(i+1).padStart(2,"0")}</span><div><h3>${esc(p.name)}</h3><p>${esc(p.role)}</p></div><span class="organizer-mark" aria-hidden="true">Q</span></article>`).join("")}</div>`;
const archiveCard=(g,i,duplicate=false)=>`<div class="tile" ${duplicate?'aria-hidden="true"':''}><span class="archive-photo"><img src="${esc(g.src)}" alt="${duplicate?"":esc(g.label)}" loading="lazy" draggable="false"></span></div>`;
const DIM={tv:[160,130],mic:[80,150],cas:[160,104],reel:[120,120],vin:[120,120],strip:[400,64],rad:[150,110],tel:[140,100],bb:[180,104],rec:[180,130],spk:[90,130],cam:[160,110],pc:[150,130],cp:[150,94],pad:[150,90],bulb:[70,110],star:[100,100],spark:[100,100],zig:[120,30],arr:[100,40]};
const ICO={tech:["pc","bulb","cp","cam"],non:["pad","mic","tv","bb"]};
const D=(n,c="",st="",x="")=>`<svg class="dec ${c}" style="${st}" viewBox="0 0 ${DIM[n][0]} ${DIM[n][1]}" aria-hidden="true" focusable="false" ${x}><use href="#${n}"/></svg>`;
const SEP=`<div class="sep" aria-hidden="true"><div class="sep-in">${D("strip","st")}${D("strip","st")}${D("strip","st")}${D("strip","st")}${D("strip","st")}${D("strip","st")}${D("strip","st")}${D("strip","st")}${D("strip","st")}${D("strip","st")}</div></div>`;
const nm=c=>CONFIG[c].map(e=>`<li>${esc(e.name)}</li>`).join("");
const home=()=>{const n=CONFIG.tech.length+CONFIG.non.length,all=[...CONFIG.tech,...CONFIG.non].map(e=>e.name).join(" ★ ")+" ★ ",ab=["QUBIT 2026 is a flagship technical and non-technical fest organised by the Department of Computer Science and Engineering (CSE), Mahatma Gandhi Institute of Technology (MGIT), bringing together students with diverse interests, skills, and talents on a common platform.","The fest is designed to provide participants with opportunities to demonstrate technical expertise, creativity, problem-solving abilities, communication skills, and teamwork through a diverse range of events. QUBIT features two major categories: Technical Events and Non-Technical Events, ensuring an engaging experience for students with different interests and strengths.","The Technical Events focus on computing, innovation, logical thinking, and practical problem-solving, providing participants with an opportunity to challenge their technical knowledge and showcase their skills. The Non-Technical Events provide a platform for creativity, communication, entertainment, and individual expression beyond the conventional academic environment.","QUBIT aims to create an environment where learning meets competition and creativity meets technology. Through interactive events, challenges, and collaborative experiences, the fest encourages students to step beyond the classroom, explore their capabilities, interact with peers, and celebrate both technical excellence and creative talent.","With its retro-inspired identity and contemporary event experience, QUBIT 2026 represents the spirit of the CSE community: innovative, competitive, creative, and connected."];
return `<section id="home" class="hero"><span class="halftone" data-par="-.1"></span><span class="burst" data-par=".07"></span>${D("tv","tvh fl","right:-3%;top:9%;width:min(38vw,460px);--r:5deg;--o:.35")}${D("mic","fl lg","left:-24px;bottom:14%;width:92px;--r:-10deg;--dc:var(--dgold)")}${D("star","pul","left:46%;top:9%;width:34px;--dc:var(--dgold)")}${D("spark","pul","right:27%;bottom:18%;width:28px")}${D("cas","spin lg","right:3%;bottom:5%;width:130px;--o:.8;--dc:var(--dgold)")}${D("cas","mh spin","right:5%;top:47%;width:86px;--r:8deg;--o:.8;--dc:var(--dgold)")}${D("mic","mh fl","left:2%;top:50%;width:46px;--r:-12deg;--o:.7;--dc:var(--dgold)")}${D("reel","mh spin","right:30%;top:57%;width:44px;--o:.55")}${D("star","mh pul","left:44%;top:46%;width:22px;--dc:var(--dgold)")}${D("spark","mh pul","right:6%;top:36%;width:24px")}${D("rec","rec-h fl","right:22%;bottom:7%;width:clamp(150px,11vw,210px);--r:-7deg;--o:.8;--dc:var(--dgold)")}
<p class="eyebrow rv">${esc(CONFIG.dept)}<em>presents</em></p>
<span class="spot" aria-hidden="true"></span><h1 class="ttl" aria-label="QUBIT ’26"><span class="ttl-shine"><img class="ttl-img" src="qubit-title.png" alt="QUBIT ’26" width="979" height="241" decoding="async" fetchpriority="high"></span></h1><div class="bulbs" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
<div class="ticket rv" style="--i:2"><small>Save the date</small><b>${(m=>m?`<span class="dl">${m[1]}</span> <span class="dl">${m[2]}</span>`:CONFIG.dates)(String(CONFIG.dates).match(/^(.*\S)\s+(\S+)$/))}</b></div>
<div class="cd" id="cd"></div></section>
<div class="band" aria-hidden="true"><div class="bt"><span>${all.repeat(2)}</span><span>${all.repeat(2)}</span></div></div>
${SEP}<section class="stats">${[[2,"Days of QUBIT"],[n,"Events"],[2,"Categories"],[29,"Years of MGIT"]].map(([x,l],i)=>`<div class="rv" style="--i:${i}"><b data-count="${x}">00</b><small>${l}</small></div>`).join("")}</section>
<section class="landing-poster"><div class="pw"><figure class="print"><img src="${esc(CONFIG.poster)}" alt="QUBIT ’26 official poster: CSE Department, MGIT. Technical and Non-Technical events, 16–17 Oct."></figure>${D("vin","spin","right:-46px;bottom:-60px;width:min(30vw,240px);--o:.75;--dc:var(--dgold)")}</div></section>
<section id="about" class="about"><div class="ab">${D("star","pul","left:-8px;top:-10px;width:30px;--dc:var(--dgold)")}${D("spk","lg","right:-22px;bottom:-60px;width:92px;--r:6deg;--o:.5")}<h2 class="mk"><span>About</span></h2><p class="sub rv">Organised by the Department of Computer Science and Engineering, Mahatma Gandhi Institute of Technology (MGIT)</p>${ab.map((t,i)=>`<p class="rv${i?"":" lede"}" style="--i:${i}">${t}</p>`).join("")}</div></section>
<section id="events">${D("cas","spin lg","right:4%;top:36px;width:150px;--r:-12deg;--dc:var(--dgold)")}${D("mic","fl lg","right:21%;top:18px;width:62px;--r:14deg")}${D("star","pul","left:44%;top:46px;width:30px;--dc:var(--dgold)")}${D("rad","lg","left:-56px;bottom:-34px;width:220px;--r:-6deg;--o:.32")}${D("zig","dr lg","right:7%;bottom:14px;width:150px;--dc:var(--dgold)")}<h2 class="mk"><span>Events</span></h2><div class="cats">${["tech","non"].map((c,k)=>`<a class="cat ${c} rv" style="--i:${k}" href="#/${c}"><h3>${c==="non"?"<span class=\"nowrap\">Non-Technical</span><br>Events":cats[c][0]}</h3><ul>${CONFIG[c].slice(0,c==="non"?6:CONFIG[c].length).map((e,i)=>`<li><i>${String(i+1).padStart(2,"0")}</i>${esc(e.name)}${c==="non"&&i===5&&CONFIG[c].length>6?" etc.":""}</li>`).join("")}</ul><span class="go">Browse <b>↗</b></span></a>`).join("")}</div></section>
${SEP}<section id="gallery">${D("reel","spin lg","right:3%;top:24px;width:120px;--dc:var(--dgold)")}${D("arr","lg","left:46%;top:44px;width:90px")}${D("star","pul","right:18%;top:62px;width:26px;--dc:var(--dgold)")}<h2 class="mk"><span>Archive</span></h2><div class="archive-controls"><span class="archive-note">Memories from earlier QUBITs</span></div><div class="archive-viewport" tabindex="0" aria-label="QUBIT photo archive">${CONFIG.gallery.length?`<div class="archive-track"><div class="archive-set">${CONFIG.gallery.map((g,i)=>archiveCard(g,i)).join("")}</div><div class="archive-set" aria-hidden="true">${CONFIG.gallery.map((g,i)=>archiveCard(g,i,true)).join("")}</div></div>`:"<p class=\"archive-empty\">No archive photographs are available yet.</p>"}</div></section>
<section id="faculty">${D("bulb","pul lg","right:6%;top:30px;width:50px;--r:12deg;--dc:var(--dgold)")}${D("spark","pul","right:15%;top:72px;width:24px")}<h2 class="mk"><span>Faculty</span></h2><p class="section-intro">The faculty who guide and support QUBIT.</p><div class="fgrid"><div><aside class="marq rv"><div class="mi"><h3>Chairman</h3><p><b>${esc(CONFIG.chairman.name)}</b><br>${esc(CONFIG.chairman.role)}</p><hr><h3>Faculty Coordinators</h3><ul>${CONFIG.facCoord.map(f=>`<li>${esc(f)}</li>`).join("")}</ul></div></aside><div class="rs lg">${D("rad","st","width:min(100%,250px);--r:-5deg;--o:.6")}</div></div><div>${people(CONFIG.faculty,"fac")}</div></div></section>
<section id="coordinators">${D("spark","pul","right:3%;top:92px;width:28px")}<h2 class="mk"><span>Coordinators</span></h2><p class="section-intro">Meet the team organizing QUBIT.</p>${organizers(CONFIG.coordinators)}</section>
${SEP}<section id="contact">${D("tel","fl lg","right:6%;top:30px;width:170px;--r:8deg;--dc:var(--dgold)")}${D("pad","lg","left:-34px;bottom:-30px;width:190px;--r:-10deg;--o:.3")}${D("star","pul","right:31%;top:60px;width:28px;--dc:var(--dgold)")}<h2 class="mk"><span>Contact</span></h2><p class="section-intro">Questions about QUBIT ’26? Reach out to the CSE department team.</p><div class="cwrap"><div class="box cmap"><iframe title="MGIT location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${esc(CONFIG.mapEmbed)}"></iframe><a class="btn" href="${esc(CONFIG.mapLink)}" target="_blank" rel="noopener">Open in Maps ↗</a></div><div><div class="cinfo"><div class="box ci"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg><div><h3>Location</h3><p>${esc(CONFIG.location)}</p></div></div><div class="box ci"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h3l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v3a3 3 0 01-3 3A16 16 0 013 6a3 3 0 013-3z"/></svg><div><h3>Call</h3><p>${/\d{6,}/.test(CONFIG.phone)?`<a href="tel:${esc(CONFIG.phone.replace(/[^+\d]/g,""))}">${esc(CONFIG.phone)}</a>`:esc(CONFIG.phone)}</p></div></div></div><div class="box git"><h3>Get in Touch</h3><p>Questions about QUBIT 2026? Reach out to the CSE department team.</p></div></div></div></section>`};
const list=k=>`<section class="lp">${D("tv","fl lg","right:-70px;top:150px;width:330px;--r:-6deg;--o:.2")}${D("reel","spin lg","left:-56px;bottom:50px;width:200px;--o:.22;--dc:var(--dgold)")}<a class="back" href="#events">← Back</a><h2 class="mk"><span>${cats[k][0]}</span></h2>
<div class="tabs">${Object.keys(cats).map(c=>`<a class="btn ${c===k?"on":""}" href="#/${c}">${cats[c][1]}</a>`).join("")}</div>
<div class="grid">${CONFIG[k].map((e,i)=>`<article class="card c${i%4} rv" style="--i:${i}"><span class="num">${String(i+1).padStart(2,"0")}</span>${D(ICO[k][i%4],"cdi","right:14px;top:14px;width:46px;--o:.35")}<h3>${esc(e.name)}</h3><a class="ex" href="#/event/${k}/${i}">Explore ↗</a><a class="cover" href="#/event/${k}/${i}" aria-label="Explore ${esc(e.name)}" tabindex="-1"></a></article>`).join("")}</div></section>`;
const detail=(k,i)=>{
  const e=CONFIG[k][i],t=e.team,p=e.prize||{};
  const pz=[["🥇 First prize",p.first],["🥈 Second prize",p.second],["🥉 Third prize",p.third]].filter(x=>x[1]);
  const ts=t==="individual"?"INDIVIDUAL":t?`${t.min} - ${t.max} MEMBERS`:"";
  const info=[["EVENT TYPE",cats[k][1]],["TEAM SIZE",ts],["REGISTRATION FEE",e.fee],["PRIZE POOL",e.pool],["DATE",e.date],["TIME",e.time],["VENUE",e.venue]];
  const phoneVal=e.phone||"[Placeholder coordinator number]";
  const phoneHtml=phoneVal&&!String(phoneVal).includes("Placeholder")?`<a class="cp-link" href="tel:${esc(String(phoneVal).replace(/[^+\d]/g,""))}">${esc(phoneVal)}</a>`:`<span>${esc(phoneVal)}</span>`;
  return `<section class="dtl">${D("reel","spin lg","right:-44px;top:100px;width:170px;--o:.28;--dc:var(--dgold)")}${D("star","pul","right:12%;top:90px;width:28px;--dc:var(--dgold)")}<a class="back" href="#/${k}">← Back</a>
<div class="event-heading"><small class="dim">${cats[k][1]} EVENT</small><h1>${esc(e.name)}</h1>${k==="tech"||k==="non"?"":`<p class="tag">“${esc(e.tag||"Tagline pending")}”</p>`}</div>
<figure class="print bigpost">${e.poster?`<button class="poster-trigger" type="button" aria-label="Enlarge ${esc(e.name)} poster"><img src="${esc(e.poster)}" alt="${esc(e.name)} poster"></button><dialog class="poster-dialog" aria-label="${esc(e.name)} poster"><form method="dialog"><button class="poster-close" aria-label="Close enlarged poster">Close ×</button></form><img class="poster-dialog-img" src="${esc(e.poster)}" alt="${esc(e.name)} poster enlarged"></dialog>`:art(e)}</figure>
<div class="sec"><p class="event-desc">${esc(e.desc||"[Placeholder event description]")}</p><div class="coord-fields"><div class="coord-field"><span class="coord-lbl">Coordinator:</span> <b class="coord-val">${esc(e.coordinator||"[Placeholder coordinator name]")}</b></div><div class="coord-field"><span class="coord-lbl">Phone:</span> <b class="coord-val">${phoneHtml}</b></div></div><a class="reg" href="${esc(e.form||"#")}"${e.form&&CONFIG.newTab?' target="_blank" rel="noopener"':""}>Register Now</a></div></section>`};
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;let rvIO;
app.addEventListener("click",e=>{
  if(!(e.target instanceof Element))return;
  const back=e.target.closest('a.back[href="#events"]');
  if(back){e.preventDefault();history.pushState(null,"","#events");route();return}
  const trigger=e.target.closest(".poster-trigger");
  if(trigger){const d=trigger.closest(".bigpost")?.querySelector(".poster-dialog");if(d)d.showModal();return}
  if(e.target.closest(".poster-close")){const d=e.target.closest("dialog");if(d)d.close();return}
  if(e.target.matches(".poster-dialog")){
    const r=e.target.getBoundingClientRect();
    const inBox=r.top<=e.clientY&&e.clientY<=r.top+r.height&&r.left<=e.clientX&&e.clientX<=r.left+r.width;
    if(!inBox)e.target.close();
  }
});
function fx(){const els=app.querySelectorAll(".rv:not(.in),.mk:not(.in),.clip:not(.in)");
  if(RM){els.forEach(e=>e.classList.add("in"));app.querySelectorAll("[data-count]").forEach(e=>e.textContent=String(e.dataset.count).padStart(2,"0"));return}
  rvIO=rvIO||new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;rvIO.unobserve(x.target);x.target.classList.add("in")}),{threshold:.12});
  els.forEach(e=>rvIO.observe(e));
  const cIO=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;cIO.unobserve(x.target);const e=x.target,n=+e.dataset.count,t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1300);e.textContent=String(Math.round(n*(1-Math.pow(1-p,3)))).padStart(2,"0");p<1&&requestAnimationFrame(f)})(t0)}),{threshold:.4});
  app.querySelectorAll("[data-count]").forEach(e=>cIO.observe(e))}
if(!RM){let tk=0;addEventListener("scroll",()=>{if(tk)return;tk=requestAnimationFrame(()=>{tk=0;document.querySelectorAll("[data-par],[data-px]").forEach(e=>e.style.translate=((e.dataset.px||0)*scrollY).toFixed(1)+"px "+((e.dataset.par||0)*scrollY).toFixed(1)+"px")})},{passive:true})}
// countdown
const T=new Date(CONFIG.target).getTime();
setInterval(tick,1000);
function tick(){const el=$("#cd");if(!el)return;const s=Math.max(0,Math.floor((T-Date.now())/1000));
  if(Date.now()>=T){el.innerHTML=`<p class="cdmsg">${CONFIG.afterMsg}</p>`;return}
  el.innerHTML=`<div class="cdbox">${[["Days",s/86400],["Hours",s%86400/3600],["Mins",s%3600/60],["Secs",s%60]].map(([l,n])=>`<span class="cu"><b>${String(Math.floor(n)).padStart(2,"0")}</b><small>${l}</small></span>`).join('<i class="cc" aria-hidden="true">:</i>')}</div>`}
// router
let cur="",io,archiveIO,archiveFrame=0;
const FOOT=`<footer class="mgit-foot"><img src="${esc(CONFIG.collegeLogo)}" alt="Mahatma Gandhi Institute of Technology logo"><p><span class="l1">QUBIT ’26 &nbsp;·&nbsp; Department of CSE</span><span class="dot"> &nbsp;·&nbsp; </span><span class="l2">Mahatma Gandhi Institute of Technology</span></p></footer>`;
function route(){
  const h=location.hash,m=h.match(/^#\/(tech|non)$/),d=h.match(/^#\/event\/(tech|non)\/(\d+)$/),ok=d&&CONFIG[d[1]][d[2]];
  const key=m?h:ok?h:"home";
  const returningToHome=key==="home"&&cur!==""&&cur!=="home"&&h.length>1;
  if(!returningToHome)app.style.visibility="";
  if(returningToHome)app.style.visibility="hidden";
  if(key!==cur){if(archiveFrame)cancelAnimationFrame(archiveFrame);archiveFrame=0;if(archiveIO){archiveIO.disconnect();archiveIO=null}cur=key;app.innerHTML=`<div class="view">${m?list(m[1]):ok?detail(d[1],+d[2]):home()}</div>${FOOT}`;
    if(key==="home"){tick();initArchive();io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&mark("#"+x.target.id)),{rootMargin:"-40% 0px -55% 0px"});app.querySelectorAll("section[id]").forEach(s=>io.observe(s))}else{io&&io.disconnect();mark("#events")}}
  if(key==="home"){let t=null;try{t=h.length>1&&$(h)}catch(e){}if(t){const align=()=>{if(location.hash!==h||cur!=="home")return;t.scrollIntoView({behavior:"instant",block:"start"});app.style.visibility=""};if(returningToHome){const pending=[...app.querySelectorAll("img")].filter(img=>(t.compareDocumentPosition(img)&Node.DOCUMENT_POSITION_PRECEDING)&&!img.complete);if(pending.length)Promise.all(pending.map(img=>new Promise(resolve=>{img.addEventListener("load",resolve,{once:true});img.addEventListener("error",resolve,{once:true})}))).then(align);else requestAnimationFrame(()=>requestAnimationFrame(align))}else t.scrollIntoView({behavior:"instant",block:"start"})}else scrollTo({top:0,behavior:"instant"})}else scrollTo({top:0,behavior:"instant"});
  fx();
}
const mark=id=>document.querySelectorAll("#nav a,#menuPanel a").forEach(a=>{const on=a.getAttribute("href")===id;a.classList.toggle("on",on);const n=a.parentElement;if(on&&n.id==="nav"&&n.scrollWidth>n.clientWidth)n.scrollLeft=a.offsetLeft-(n.clientWidth-a.offsetWidth)/2});
history.scrollRestoration="manual";
history.replaceState(null,"","#home");
addEventListener("hashchange",route);route();
function initArchive(){
  const viewport=$(".archive-viewport"),track=$(".archive-track");
  if(!viewport||!track)return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let paused=reduced,last=0;
  viewport.addEventListener("mouseenter",()=>paused=true);
  viewport.addEventListener("mouseleave",()=>paused=false);
  viewport.addEventListener("focusin",()=>paused=true);
  viewport.addEventListener("focusout",e=>{if(!viewport.contains(e.relatedTarget))paused=false});
  const advance=time=>{
    if(last&&!paused){
      const first=track.querySelector(".archive-set");
      const gap=parseFloat(getComputedStyle(track).columnGap)||0;
      viewport.scrollLeft+=Math.min(time-last,50)*.025;
      if(viewport.scrollLeft>=first.getBoundingClientRect().width+gap)viewport.scrollLeft-=first.getBoundingClientRect().width+gap;
    }
    last=time;
    archiveFrame=requestAnimationFrame(advance);
  };
  /* drift only while the archive is on screen: off-screen it forced a layout read every frame */
  if(!reduced&&CONFIG.gallery.length>1){archiveIO=new IntersectionObserver(es=>{cancelAnimationFrame(archiveFrame);archiveFrame=0;if(es[es.length-1].isIntersecting){last=0;archiveFrame=requestAnimationFrame(advance)}});archiveIO.observe(viewport)}
}
// menu button: opens as an overlay right where the user is (no scroll jump, no page lock)
(()=>{const btn=$("#menuBtn"),hd=$("header"),panel=$("#menuPanel");if(!btn||!panel)return;
const set=o=>{hd.classList.toggle("open",o);btn.setAttribute("aria-expanded",String(o));btn.setAttribute("aria-label",o?"Close menu":"Open menu")};
btn.addEventListener("click",e=>{e.preventDefault();set(!hd.classList.contains("open"))});
panel.addEventListener("click",e=>{if(e.target.closest("a"))set(false)});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){set(false);const d=document.querySelector(".poster-dialog[open]");if(d)d.close();}});
document.addEventListener("pointerdown",e=>{if(hd.classList.contains("open")&&!hd.contains(e.target))set(false)});
matchMedia("(min-width:821px)").addEventListener("change",e=>{if(e.matches)set(false)})})();
// date ticket: "Save the date" + date on exactly two lines; shrink the date text to fit any width
(()=>{const fit=()=>{const b=$(".ticket b");if(!b)return;const t=b.parentElement,par=t.parentElement;b.style.fontSize="";
const cs=getComputedStyle(par),ts=getComputedStyle(t);
const avail=par.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)-parseFloat(ts.paddingLeft)-parseFloat(ts.paddingRight)-2*parseFloat(ts.borderLeftWidth)-8;
const w=b.scrollWidth;if(avail>0&&w>avail)b.style.fontSize=(parseFloat(getComputedStyle(b).fontSize)*avail/w)+"px"};
addEventListener("resize",fit);addEventListener("hashchange",()=>requestAnimationFrame(fit));addEventListener("load",fit);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);[200,800,2000].forEach(ms=>setTimeout(fit,ms));fit()})();
