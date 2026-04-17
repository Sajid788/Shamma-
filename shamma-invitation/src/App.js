import { useState, useEffect, useRef } from "react";

const LEGACY_EVENTS = [
  { icon: "🕌", title: "Nikah Ceremony", date: "14th June 2025", time: "10:00 AM – 12:00 PM", venue: "Al-Noor Grand Masjid, Ranchi", sub: "Main Prayer Hall", mapLabel: "Panki, Palamu, Jharkhand", mapUrl: "https://maps.google.com/?q=Panki,Palamu,Jharkhand" },
  { icon: "🌙", title: "Mehndi Night", date: "13th June 2025", time: "5:00 PM Onwards", venue: "Bride's Residence, Ranchi", sub: "Jharkhand, India", mapLabel: "Panki, Palamu, Jharkhand", mapUrl: "https://maps.google.com/?q=Panki,Palamu,Jharkhand" },
  { icon: "✨", title: "Walima Reception", date: "15th June 2025", time: "7:00 PM – 11:00 PM", venue: "Royal Palace Banquet, Ranchi", sub: "Premium Hall, Ground Floor", mapLabel: "Panki, Palamu, Jharkhand", mapUrl: "https://maps.google.com/?q=Panki,Palamu,Jharkhand" },
];

const EVENTS = [
  { icon: "🕌", title: "Nikah", date: "20th April 2026", time: "10:00 PM", venue: "Panki, Palamu, Jharkhand", sub: "Nikah Ceremony", mapLabel: "Panki, Palamu, Jharkhand", mapUrl: "https://maps.google.com/?q=Panki,Palamu,Jharkhand" },
  { icon: "🌼", title: "Rasm-E-Haldi", date: "18th April 2026", time: "4:00 PM", venue: "Panki, Palamu, Jharkhand", sub: "Saturday Ceremony", mapLabel: "Panki, Palamu, Jharkhand", mapUrl: "https://maps.google.com/?q=Panki,Palamu,Jharkhand" },
  { icon: "✨", title: "Arrival Of Barat", date: "20th April 2026", time: "9:00 PM", venue: "Panki, Palamu, Jharkhand", sub: "Before Nikah", mapLabel: "Panki, Palamu, Jharkhand", mapUrl: "https://maps.google.com/?q=Panki,Palamu,Jharkhand" },
];

const DUAS = [
  { arabic: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ", trans: "In the name of Allah, the Most Gracious, the Most Merciful" },
  { arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا", trans: "And of His signs is that He created for you mates from yourselves — Quran 30:21" },
];

const BLESSINGS = [
  { icon: "☪️", title: "Blessed Union", desc: "United in the sacred covenant of Nikah, as prescribed by Allah and the Sunnah of His Messenger ﷺ" },
  { icon: "🤲", title: "Your Du'a", desc: "We humbly request your prayers and blessings for this blessed occasion" },
  { icon: "🕌", title: "Islamic Tradition", desc: "Celebrated in accordance with the beautiful traditions of Islam, with family and loved ones" },
  { icon: "🌿", title: "A New Beginning", desc: "May this union be filled with love, mercy, and barakah in this life and the next" },
];

const GALLERY_IMAGES = [
  { id: 1, url: "/Assets/1.jpeg", label: "Wedding Memory 1" },
  { id: 2, url: "/Assets/2.jpeg", label: "Wedding Memory 2" },
  { id: 3, url: "/Assets/3.jpeg", label: "Wedding Memory 3" },
  { id: 4, url: "/Assets/4.jpeg", label: "Wedding Memory 4" },
  { id: 5, url: "/Assets/5.jpeg", label: "Wedding Memory 5" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function FadeIn({ children, delay = 0, dir = "up", className = "" }) {
  const [ref, vis] = useInView();
  const tr = { up: "translateY(36px)", left: "translateX(-36px)", right: "translateX(36px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0, transform: vis ? "none" : (tr[dir] || tr.up),
      transition: `opacity 0.9s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.9s cubic-bezier(.4,0,.2,1) ${delay}s`
    }}>{children}</div>
  );
}

function GeometricPattern() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" style={{ position:"absolute", inset:0, opacity:0.04, pointerEvents:"none" }}>
      {Array.from({length:6}).map((_,r)=>Array.from({length:6}).map((_,c)=>(
        <g key={`${r}-${c}`} transform={`translate(${c*70},${r*70})`}>
          <polygon points="35,2 67,18 67,52 35,68 3,52 3,18" fill="none" stroke="#d4af37" strokeWidth="0.8"/>
          <polygon points="35,12 57,24 57,46 35,58 13,46 13,24" fill="none" stroke="#d4af37" strokeWidth="0.4"/>
        </g>
      )))}
    </svg>
  );
}

function StarDivider() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, margin:"28px 0" }}>
      <div style={{ height:1, flex:1, background:"linear-gradient(90deg,transparent,rgba(212,175,55,0.5))" }}/>
      <span style={{ color:"#d4af37", fontSize:18 }}>✦ ☪ ✦</span>
      <div style={{ height:1, flex:1, background:"linear-gradient(90deg,rgba(212,175,55,0.5),transparent)" }}/>
    </div>
  );
}

function Countdown() {
  const targetTime = new Date("2026-04-20T22:00:00+05:30").getTime();
  const [t, setT] = useState({d:0,h:0,m:0,s:0});
  useEffect(() => {
    const tick = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setT({ d:0,h:0,m:0,s:0 });
        return;
      }
      setT({ d:Math.floor(diff/86400000), h:Math.floor(diff/3600000)%24, m:Math.floor(diff/60000)%60, s:Math.floor(diff/1000)%60 });
    };
    tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id);
  }, [targetTime]);
  return (
    <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
      {[["Days",t.d],["Hours",t.h],["Mins",t.m],["Secs",t.s]].map(([l,v])=>(
        <div key={l} style={{ background:"rgba(212,175,55,0.1)", border:"1px solid rgba(212,175,55,0.35)", borderRadius:14,
          padding:"14px 18px", textAlign:"center", minWidth:72, backdropFilter:"blur(10px)" }}>
          <div style={{ fontSize:30, fontWeight:700, color:"#d4af37", fontFamily:"'Playfair Display',serif", lineHeight:1 }}>{String(v).padStart(2,"0")}</div>
          <div style={{ fontSize:10, color:"rgba(212,175,55,0.7)", letterSpacing:2.5, textTransform:"uppercase", marginTop:4 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function Gallery() {
  const [imgs] = useState(GALLERY_IMAGES);
  const [hov, setHov] = useState(null);
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14, marginBottom:28 }}>
        {imgs.map((img,i)=>(
          <FadeIn key={img.id} delay={i*0.06}>
            <div className="gallery-card" onMouseEnter={()=>setHov(img.id)} onMouseLeave={()=>setHov(null)}
              style={{ position:"relative", borderRadius:14, overflow:"hidden", cursor:"pointer", background:"rgba(255,255,255,0.04)",
                boxShadow: hov===img.id?"0 16px 48px rgba(0,80,40,0.35)":"0 4px 16px rgba(0,0,0,0.18)",
                transform: hov===img.id?"scale(1.04)":"scale(1)", transition:"all 0.35s ease",
                border: hov===img.id?"2px solid rgba(212,175,55,0.6)":"2px solid transparent" }}>
              <img className="gallery-image" src={img.url} alt={img.label}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,50,20,0.7),transparent)",
                opacity: hov===img.id?1:0, transition:"opacity 0.3s", display:"flex", alignItems:"flex-end", padding:12 }}>
                <span style={{ color:"#d4af37", fontFamily:"'Playfair Display',serif", fontSize:13 }}>{img.label}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <div style={{ textAlign:"center", display:"none" }}>
        <label style={{ display:"inline-flex", alignItems:"center", gap:8, cursor:"pointer", padding:"12px 30px",
          background:"linear-gradient(135deg,#1a5c35,#2d8653)", color:"#d4af37", borderRadius:999,
          fontFamily:"'Cormorant Garamond',serif", fontSize:16, border:"1px solid rgba(212,175,55,0.4)",
          boxShadow:"0 4px 20px rgba(0,80,40,0.3)", transition:"transform 0.2s, box-shadow 0.2s" }}>
          📷 Add Your Photos
          <input type="file" accept="image/*" multiple style={{ display:"none" }} onChange={() => {}}/>
        </label>
      </div>
    </div>
  );
}

export default function App() {
  const [navBg, setNavBg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const NAV = [{l:"Home",id:"home"},{l:"Invitation",id:"invitation"},{l:"Events",id:"events"},{l:"Gallery",id:"gallery"},{l:"Blessings",id:"blessings"}];

  useEffect(()=>{
    const h=()=>setNavBg(window.scrollY>60);
    window.addEventListener("scroll",h); return()=>window.removeEventListener("scroll",h);
  },[]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1;

    const tryPlay = () => {
      audio.play()
        .catch(() => {});
    };

    tryPlay();

    const unlockAudio = () => {
      tryPlay();
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    audio.addEventListener("canplaythrough", tryPlay);

    return () => {
      audio.removeEventListener("canplaythrough", tryPlay);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  const scrollTo=id=>{ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };

  const G = { // green palette
    deep: "#0a2e1a", dark: "#0f3d22", mid: "#1a5c35", bright: "#2d8653", light: "#e8f5ee",
    gold: "#d4af37", goldLight: "rgba(212,175,55,0.15)", goldBorder: "rgba(212,175,55,0.3)",
  };

  return (
    <div style={{ fontFamily:"'Cormorant Garamond',serif", background:G.light, minHeight:"100vh", overflowX:"hidden" }}>
      <audio ref={audioRef} src="/Assets/song.mpeg" autoPlay preload="auto" loop playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-28px)} to{opacity:1;transform:none} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .playfair{font-family:'Playfair Display',serif!important}
        .cormorant{font-family:'Cormorant Garamond',serif!important}
        .amiri{font-family:'Amiri',serif!important; direction:rtl}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:${G.deep}}
        ::-webkit-scrollbar-thumb{background:linear-gradient(${G.gold},${G.bright});border-radius:999px}
        .nav-links{display:flex;gap:4px}
        .hide-desktop{display:none}
        @media(max-width:640px){
          .hide-mobile{display:none!important}
          .nav-links{display:none!important}
          .hide-desktop{display:inline-flex!important;align-items:center;justify-content:center}
          .nav-links.open{display:flex!important;flex-direction:column;position:absolute;top:60px;left:0;right:0;background:rgba(10,46,26,0.98);padding:16px;gap:8px;backdrop-filter:blur(12px)}
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:200,
        background:navBg?"rgba(10,46,26,0.95)":"transparent",
        backdropFilter:navBg?"blur(16px)":"none",
        borderBottom:navBg?`1px solid ${G.goldBorder}`:"none",
        transition:"all 0.4s",padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div className="playfair" style={{ color:G.gold,fontSize:17,fontStyle:"italic",letterSpacing:1 }}>☪ S & D</div>
        {/* Desktop nav */}
        <div className="nav-links">
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>scrollTo(n.id)} style={{ background:"transparent",border:"none",cursor:"pointer",
              padding:"6px 14px",borderRadius:999,color:navBg?G.gold:"rgba(255,255,255,0.9)",
              fontFamily:"'Cormorant Garamond',serif",fontSize:15,letterSpacing:0.5,transition:"color 0.2s" }}>{n.l}</button>
          ))}
        </div>
        <div style={{ display:"flex",gap:10,alignItems:"center" }}>
          <button className="hide-desktop" onClick={()=>setMenuOpen(p=>!p)} style={{ background:"transparent",border:`1px solid ${G.goldBorder}`,
            borderRadius:8,padding:"5px 10px",cursor:"pointer",color:G.gold,fontSize:18,lineHeight:1 }}>☰</button>
        </div>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position:"fixed",top:60,left:0,right:0,zIndex:199,background:"rgba(10,46,26,0.97)",
          backdropFilter:"blur(16px)",borderBottom:`1px solid ${G.goldBorder}`,padding:"16px 24px",display:"flex",flexDirection:"column",gap:4 }}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>scrollTo(n.id)} style={{ background:"transparent",border:"none",cursor:"pointer",
              padding:"10px 0",color:G.gold,fontFamily:"'Cormorant Garamond',serif",fontSize:18,textAlign:"left",
              borderBottom:`1px solid ${G.goldBorder}` }}>{n.l}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight:"100vh",position:"relative",overflow:"hidden",
        background:`linear-gradient(160deg,${G.deep} 0%,${G.dark} 40%,#0d3320 70%,#112b1a 100%)`,
        display:"flex",alignItems:"center",justifyContent:"center" }}>
        <GeometricPattern/>
        {/* Radial glow */}
        <div style={{ position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",
          width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(45,134,83,0.18),transparent 70%)",pointerEvents:"none" }}/>
        {/* Crescent top */}
        <div style={{ position:"absolute",top:80,left:"50%",transform:"translateX(-50%)",
          fontSize:"clamp(40px,8vw,70px)",opacity:0.12,animation:"float 6s ease infinite",pointerEvents:"none" }}>☪</div>

        <div style={{ textAlign:"center",padding:"100px 20px 60px",position:"relative",zIndex:2,maxWidth:760,width:"100%" }}>
          {/* Bismillah */}
          <div style={{ animation:"fadeDown 1s ease 0.1s both" }}>
            <div className="amiri" style={{ fontSize:"clamp(1.3rem,4vw,2rem)",color:G.gold,marginBottom:8,textAlign:"center" }}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
            <div className="cormorant" style={{ fontSize:13,color:"rgba(212,175,55,0.65)",letterSpacing:2,marginBottom:32 }}>
              In the name of Allah, the Most Gracious, the Most Merciful
            </div>
          </div>

          {/* Ornament */}
          <div style={{ animation:"fadeDown 1s ease 0.3s both" }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginBottom:32 }}>
              <div style={{ height:1,width:60,background:`linear-gradient(90deg,transparent,${G.gold})` }}/>
              <span style={{ color:G.gold,fontSize:20 }}>✦</span>
              <span style={{ color:G.gold,fontSize:28 }}>☪</span>
              <span style={{ color:G.gold,fontSize:20 }}>✦</span>
              <div style={{ height:1,width:60,background:`linear-gradient(90deg,${G.gold},transparent)` }}/>
            </div>
            <div className="cormorant" style={{ color:"rgba(212,175,55,0.7)",fontSize:"clamp(11px,2vw,13px)",letterSpacing:5,textTransform:"uppercase",marginBottom:20 }}>
              Islamic Wedding Invitation
            </div>
          </div>

          {/* Names */}
          <div style={{ animation:"fadeDown 1s ease 0.5s both" }}>
            <h1 className="playfair" style={{ fontSize:"clamp(2.2rem,7vw,4.8rem)",color:"#fff",lineHeight:1.15,marginBottom:12,fontWeight:600 }}>
              Shamma Praveen
            </h1>
            <div style={{ fontSize:"clamp(1rem,3vw,1.8rem)",color:G.gold,margin:"10px 0",letterSpacing:8 }}>✦ &amp; ✦</div>
            <h1 className="playfair" style={{ fontSize:"clamp(2.2rem,7vw,4.8rem)",color:"#fff",lineHeight:1.15,marginBottom:28,fontWeight:600 }}>
              Md Danish Ansari
            </h1>
          </div>

          {/* Date banner */}
          <div style={{ animation:"fadeDown 1s ease 0.7s both" }}>
            <div style={{ display:"inline-block",padding:"10px clamp(16px,4vw,32px)",border:`1px solid ${G.goldBorder}`,
              borderRadius:999,background:G.goldLight,backdropFilter:"blur(8px)",marginBottom:32,maxWidth:"92vw" }}>
              <span className="cormorant" style={{ color:G.gold,fontSize:"clamp(10px,2.5vw,18px)",letterSpacing:1.2,whiteSpace:"nowrap",display:"none" }}>
                14 June 2025 &nbsp;·&nbsp; Ranchi, Jharkhand
              </span>
              <span className="cormorant" style={{ color:G.gold,fontSize:"clamp(10px,2.5vw,18px)",letterSpacing:1.2,whiteSpace:"nowrap",display:"block" }}>
                20 April 2026 · Panki, Palamu, Jharkhand, India
              </span>
            </div>
          </div>

          {/* Countdown */}
          <div style={{ animation:"fadeDown 1s ease 0.85s both",marginBottom:40 }}>
            <Countdown/>
          </div>

          <div style={{ animation:"fadeDown 1s ease 1s both",display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
            <button onClick={()=>scrollTo("invitation")} style={{ padding:"13px 32px",
              background:`linear-gradient(135deg,${G.gold},#b8960c)`,color:G.deep,border:"none",borderRadius:999,
              cursor:"pointer",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,
              boxShadow:"0 8px 28px rgba(212,175,55,0.35)",transition:"transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow="0 12px 36px rgba(212,175,55,0.5)"}}
              onMouseLeave={e=>{e.target.style.transform="none";e.target.style.boxShadow="0 8px 28px rgba(212,175,55,0.35)"}}>
              View Invitation
            </button>
            <button onClick={()=>scrollTo("events")} style={{ padding:"13px 32px",background:"transparent",
              color:G.gold,border:`1px solid ${G.goldBorder}`,borderRadius:999,cursor:"pointer",
              fontFamily:"'Playfair Display',serif",fontSize:15,backdropFilter:"blur(8px)",transition:"all 0.2s" }}
              onMouseEnter={e=>{e.target.style.background=G.goldLight;e.target.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.transform="none"}}>
              Event Details
            </button>
          </div>
        </div>
      </section>

      {/* GOLD DIVIDER */}
      <div style={{ height:3,background:`linear-gradient(90deg,${G.deep},${G.gold},${G.bright},${G.gold},${G.deep})` }}/>

      {/* INVITATION SECTION */}
      <section id="invitation" style={{ padding:"90px 20px",background:`linear-gradient(180deg,${G.deep},${G.dark})`,position:"relative",overflow:"hidden" }}>
        <GeometricPattern/>
        <div style={{ maxWidth:760,margin:"0 auto",position:"relative",zIndex:2 }}>
          <FadeIn>
            <div style={{ textAlign:"center",marginBottom:56 }}>
              <div className="cormorant" style={{ color:G.gold,letterSpacing:5,fontSize:12,textTransform:"uppercase",marginBottom:12 }}>
                ✦ Bismillah ✦
              </div>
              <h2 className="playfair" style={{ fontSize:"clamp(1.8rem,5vw,3rem)",color:"#fff",marginBottom:8 }}>
                Our Wedding Invitation
              </h2>
              <StarDivider/>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            {/* Card */}
            <div style={{ background:"rgba(255,255,255,0.03)",backdropFilter:"blur(20px)",
              border:`1px solid ${G.goldBorder}`,borderRadius:28,padding:"clamp(28px,6vw,56px)",
              boxShadow:"0 24px 80px rgba(0,0,0,0.4)",position:"relative",overflow:"hidden" }}>
              {/* Corner ornaments */}
              {[{t:16,l:16},{t:16,r:16},{b:16,l:16},{b:16,r:16}].map((p,i)=>(
                <div key={i} style={{ position:"absolute",top:p.t,left:p.l,right:p.r,bottom:p.b,color:G.gold,fontSize:16,opacity:0.5 }}>✦</div>
              ))}
              {/* Arabic */}
              <div style={{ textAlign:"center",marginBottom:28 }}>
                <div className="amiri" style={{ fontSize:"clamp(1.4rem,4vw,2.2rem)",color:G.gold,marginBottom:6 }}>
                  السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
                </div>
                <div className="cormorant" style={{ color:"rgba(212,175,55,0.65)",fontSize:14,letterSpacing:1 }}>
                  Peace, Mercy and Blessings of Allah be upon you
                </div>
              </div>
              <StarDivider/>
              <div className="cormorant" style={{ color:"rgba(255,255,255,0.85)",fontSize:"clamp(16px,3vw,20px)",lineHeight:2,textAlign:"center",marginBottom:24 }}>
                With the blessings of <strong style={{color:G.gold}}>Allah Subhanahu Wa Ta'ala</strong> and in the honour of our beloved families, we joyfully announce the Nikah of our cherished children:
              </div>
              <div style={{ textAlign:"center",margin:"28px 0",padding:"28px 20px",
                border:`1px solid ${G.goldBorder}`,borderRadius:20,background:"rgba(212,175,55,0.05)" }}>
                <div className="playfair" style={{ fontSize:"clamp(1.5rem,4vw,2.4rem)",color:"#fff",marginBottom:8,fontStyle:"italic" }}>
                  Shamma Praveen
                </div>
                <div style={{ fontSize:13,color:"rgba(255,255,255,0.5)",letterSpacing:3,marginBottom:12 }}>DAUGHTER OF</div>
                <div className="cormorant" style={{ color:G.gold,fontSize:"clamp(14px,3vw,18px)" }}>Late. Islam Ansari</div>
                <div style={{ color:G.gold,fontSize:28,margin:"16px 0",letterSpacing:8 }}>✦ ☪ ✦</div>
                <div className="playfair" style={{ fontSize:"clamp(1.5rem,4vw,2.4rem)",color:"#fff",marginBottom:8,fontStyle:"italic" }}>
                  Md Danish Ansari
                </div>
                <div style={{ fontSize:13,color:"rgba(255,255,255,0.5)",letterSpacing:3,marginBottom:12 }}>SON OF</div>
                <div className="cormorant" style={{ color:G.gold,fontSize:"clamp(14px,3vw,18px)" }}>Md. Bashir Ansari</div>
              </div>
              <div className="amiri" style={{ textAlign:"center",fontSize:"clamp(1.1rem,3vw,1.5rem)",color:G.gold,margin:"24px 0 8px" }}>
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
              </div>
              <div className="cormorant" style={{ textAlign:"center",color:"rgba(212,175,55,0.7)",fontSize:14,fontStyle:"italic",marginBottom:28 }}>
                "And of His signs is that He created for you from yourselves mates that you may find tranquility in them" — Quran 30:21
              </div>
              <StarDivider/>
              <div className="cormorant" style={{ color:"rgba(255,255,255,0.8)",fontSize:"clamp(15px,2.5vw,19px)",lineHeight:2,textAlign:"center" }}>
                Your presence, prayers, and blessings will make this sacred occasion truly complete. We humbly request the honour of your company as we celebrate this beautiful union in accordance with the Sunnah of our Prophet Muhammad ﷺ.
              </div>
              <div style={{ textAlign:"center",marginTop:28 }}>
                <div className="amiri" style={{ fontSize:"clamp(1.1rem,3vw,1.4rem)",color:G.gold }}>جَزَاكُمُ اللهُ خَيْرًا</div>
                <div className="cormorant" style={{ color:"rgba(212,175,55,0.6)",fontSize:13,marginTop:4 }}>May Allah reward you with goodness</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" style={{ padding:"90px 20px",background:G.light,position:"relative" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(45,134,83,0.06) 1px,transparent 1px)",backgroundSize:"32px 32px" }}/>
        <div style={{ maxWidth:1050,margin:"0 auto",position:"relative",zIndex:2 }}>
          <FadeIn>
            <div style={{ textAlign:"center",marginBottom:64 }}>
              <div className="cormorant" style={{ color:G.bright,letterSpacing:5,fontSize:12,textTransform:"uppercase",marginBottom:12 }}>Mark Your Calendar</div>
              <h2 className="playfair" style={{ fontSize:"clamp(1.8rem,5vw,3rem)",color:G.deep,marginBottom:16 }}>Wedding Events</h2>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:16 }}>
                <div style={{ height:1,width:60,background:`linear-gradient(90deg,transparent,${G.bright})` }}/>
                <span style={{ color:G.bright,fontSize:18 }}>✦ ☪ ✦</span>
                <div style={{ height:1,width:60,background:`linear-gradient(90deg,${G.bright},transparent)` }}/>
              </div>
            </div>
          </FadeIn>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24 }}>
            {EVENTS.map((ev,i)=>(
              <FadeIn key={i} delay={i*0.15}>
                <div style={{ background:"#fff",borderRadius:22,overflow:"hidden",
                  boxShadow:"0 8px 40px rgba(0,60,30,0.1)",border:`1px solid rgba(45,134,83,0.12)`,
                  transition:"transform 0.3s,box-shadow 0.3s",position:"relative" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 20px 60px rgba(0,60,30,0.2)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 40px rgba(0,60,30,0.1)"}}>
                  <div style={{ display:"none",position:"absolute",top:-70,right:-30,width:180,height:180,borderRadius:"50%",
                    background:"radial-gradient(circle,rgba(212,175,55,0.22),transparent 70%)",pointerEvents:"none" }}/>
                  <div style={{ display:"none",position:"absolute",bottom:-60,left:-30,width:160,height:160,borderRadius:"50%",
                    background:"radial-gradient(circle,rgba(45,134,83,0.12),transparent 72%)",pointerEvents:"none" }}/>
                  <div style={{ background:`linear-gradient(135deg,${G.dark},${G.mid})`,padding:"28px 24px",textAlign:"center",position:"relative" }}>
                    <div style={{ position:"absolute",inset:0,opacity:0.08 }}><GeometricPattern/></div>
                    <div style={{ position:"relative",zIndex:1 }}>
                      <div style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",width:72,height:72,borderRadius:"50%",
                        marginBottom:16,background:"linear-gradient(135deg,rgba(212,175,55,0.28),rgba(212,175,55,0.08))",
                        border:`1px solid rgba(212,175,55,0.35)`,boxShadow:"0 10px 28px rgba(0,0,0,0.22)",fontSize:34 }}>
                        {ev.icon}
                      </div>
                      <div className="cormorant" style={{ color:"rgba(212,175,55,0.8)",fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:8 }}>
                        Wedding Celebration
                      </div>
                      <h3 className="playfair" style={{ color:"#fff",fontSize:24,marginBottom:10 }}>{ev.title}</h3>
                      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:12 }}>
                        <div style={{ height:1,width:42,background:`linear-gradient(90deg,transparent,${G.gold})` }}/>
                        <span style={{ color:G.gold,fontSize:16 }}>✦</span>
                        <div style={{ height:1,width:42,background:`linear-gradient(90deg,${G.gold},transparent)` }}/>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding:"24px 24px 28px",position:"relative",zIndex:1 }}>
                    <div style={{ display:"grid",gap:12 }}>
                      {[["Date","📅",ev.date],["Time","⏰",ev.time],["Venue","📍",ev.venue],["Details","🏛",ev.sub]].map(([label,ic,val],j)=>(
                        <div key={j} style={{ display:j > 1 ? "none" : "grid",gridTemplateColumns:"44px 1fr",gap:12,alignItems:"center",
                          padding:"12px 14px",borderRadius:18,background:"rgba(255,255,255,0.72)",border:"1px solid rgba(26,92,53,0.08)" }}>
                          <div style={{ width:44,height:44,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",
                            background:`linear-gradient(135deg,${G.goldLight},rgba(45,134,83,0.12))`,color:G.mid,fontSize:18 }}>
                            {ic}
                          </div>
                          <div>
                            <div style={{ color:"rgba(15,61,34,0.55)",fontSize:11,letterSpacing:2.2,textTransform:"uppercase",marginBottom:3 }}>{label}</div>
                            <div className="cormorant" style={{ color:G.dark,fontSize:18,lineHeight:1.4,fontWeight:600 }}>{val}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"none",marginTop:18,padding:"12px 14px",borderRadius:16,background:"linear-gradient(135deg,rgba(212,175,55,0.12),rgba(45,134,83,0.08))",
                      border:`1px solid rgba(212,175,55,0.24)`,alignItems:"center",gap:10 }}>
                      <span style={{ fontSize:17,color:G.mid }}>📌</span>
                      <div>
                        <div style={{ color:"rgba(15,61,34,0.55)",fontSize:11,letterSpacing:2.2,textTransform:"uppercase" }}>Address</div>
                        <div className="cormorant" style={{ color:G.dark,fontSize:17,fontWeight:600 }}>{ev.mapLabel}</div>
                      </div>
                    </div>
                    <div style={{ display:"none",marginTop:22,textAlign:"center" }}>
                      <a href={ev.mapUrl} target="_blank" rel="noopener noreferrer"
                        style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4,padding:"13px 22px",
                          background:`linear-gradient(135deg,${G.mid},${G.bright})`,
                          color:"#fff",borderRadius:999,textDecoration:"none",fontSize:15,
                          fontFamily:"'Cormorant Garamond',serif",boxShadow:"0 10px 28px rgba(45,134,83,0.28)",border:"1px solid rgba(255,255,255,0.18)" }}>
                        <span style={{ fontSize:15,letterSpacing:1.6,textTransform:"uppercase",opacity:0.85 }}>📍 Open Location</span>
                        <span style={{ fontSize:17 }}>{ev.mapLabel}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding:"90px 20px",background:`linear-gradient(180deg,${G.deep},${G.dark})`,position:"relative",overflow:"hidden" }}>
        <GeometricPattern/>
        <div style={{ maxWidth:1000,margin:"0 auto",position:"relative",zIndex:2 }}>
          <FadeIn>
            <div style={{ textAlign:"center",marginBottom:56 }}>
              <div className="cormorant" style={{ color:G.gold,letterSpacing:5,fontSize:12,textTransform:"uppercase",marginBottom:12 }}>Cherished Moments</div>
              <h2 className="playfair" style={{ fontSize:"clamp(1.8rem,5vw,3rem)",color:"#fff",marginBottom:16 }}>Our Gallery</h2>
              <StarDivider/>
              <p className="cormorant" style={{ color:"rgba(255,255,255,0.65)",fontSize:18,marginTop:8 }}>
                Add your precious memories to our wedding collection
              </p>
            </div>
          </FadeIn>
          <Gallery/>
        </div>
      </section>

      {/* BLESSINGS */}
      <section id="blessings" style={{ padding:"90px 20px",background:`linear-gradient(180deg,${G.light},#f0faf4)` }}>
        <div style={{ maxWidth:1000,margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center",marginBottom:64 }}>
              <div className="cormorant" style={{ color:G.bright,letterSpacing:5,fontSize:12,textTransform:"uppercase",marginBottom:12 }}>With Gratitude</div>
              <h2 className="playfair" style={{ fontSize:"clamp(1.8rem,5vw,3rem)",color:G.deep,marginBottom:16 }}>Blessings & Du'a</h2>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginBottom:16 }}>
                <div style={{ height:1,width:60,background:`linear-gradient(90deg,transparent,${G.bright})` }}/>
                <span style={{ color:G.bright,fontSize:18 }}>✦ ☪ ✦</span>
                <div style={{ height:1,width:60,background:`linear-gradient(90deg,${G.bright},transparent)` }}/>
              </div>
            </div>
          </FadeIn>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:22,marginBottom:60 }}>
            {BLESSINGS.map((b,i)=>(
              <FadeIn key={i} delay={i*0.1}>
                <div style={{ background:"#fff",borderRadius:20,padding:"32px 24px",textAlign:"center",
                  border:`1px solid rgba(45,134,83,0.12)`,boxShadow:"0 4px 24px rgba(0,60,30,0.07)",
                  transition:"transform 0.3s,box-shadow 0.3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 16px 48px rgba(0,60,30,0.15)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 24px rgba(0,60,30,0.07)"}}>
                  <div style={{ width:60,height:60,borderRadius:"50%",background:`linear-gradient(135deg,${G.mid},${G.bright})`,
                    display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",fontSize:26 }}>{b.icon}</div>
                  <h3 className="playfair" style={{ color:G.deep,fontSize:18,marginBottom:12 }}>{b.title}</h3>
                  <p className="cormorant" style={{ color:"#5a7a65",fontSize:16,lineHeight:1.8 }}>{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Dua card */}
          <FadeIn delay={0.2}>
            <div style={{ background:`linear-gradient(135deg,${G.dark},${G.mid})`,borderRadius:28,padding:"clamp(28px,6vw,52px)",
              textAlign:"center",position:"relative",overflow:"hidden",boxShadow:"0 16px 64px rgba(0,60,30,0.3)" }}>
              <div style={{ position:"absolute",inset:0,opacity:0.05 }}><GeometricPattern/></div>
              <div style={{ position:"relative",zIndex:1 }}>
                <div className="amiri" style={{ fontSize:"clamp(1.2rem,4vw,2rem)",color:G.gold,marginBottom:16,lineHeight:1.8 }}>
                  اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَاجْمَعْ بَيْنَهُمَا فِي خَيْرٍ
                </div>
                <div className="cormorant" style={{ color:"rgba(212,175,55,0.8)",fontSize:"clamp(14px,2.5vw,18px)",fontStyle:"italic",lineHeight:1.8,marginBottom:24 }}>
                  "O Allah, bless them, shower Your blessings upon them, and join them together in goodness."
                </div>
                <div style={{ height:1,width:80,background:`linear-gradient(90deg,transparent,${G.gold},transparent)`,margin:"0 auto 24px" }}/>
                <p className="cormorant" style={{ color:"rgba(255,255,255,0.75)",fontSize:"clamp(15px,2.5vw,19px)",lineHeight:2,maxWidth:540,margin:"0 auto" }}>
                  We ask for your heartfelt prayers and du'a for the newlyweds. May Allah grant them a life filled with Barakah, love, and mercy — in this world and the hereafter.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"60px 20px 36px",background:G.deep,textAlign:"center",borderTop:`1px solid ${G.goldBorder}`,position:"relative",overflow:"hidden" }}>
        <GeometricPattern/>
        <div style={{ position:"relative",zIndex:2 }}>
          <div className="amiri" style={{ fontSize:"clamp(1.2rem,4vw,1.8rem)",color:G.gold,marginBottom:8 }}>
            بَارَكَ اللَّهُ لَكُمَا
          </div>
          <div className="cormorant" style={{ color:"rgba(212,175,55,0.6)",fontSize:14,marginBottom:24 }}>May Allah bless you both</div>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:24 }}>
            <div style={{ height:1,width:48,background:`linear-gradient(90deg,transparent,${G.gold})` }}/>
            <div className="playfair" style={{ color:"#fff",fontSize:"clamp(1.2rem,4vw,1.8rem)",fontStyle:"italic" }}>Shamma & Danish</div>
            <div style={{ height:1,width:48,background:`linear-gradient(90deg,${G.gold},transparent)` }}/>
          </div>
          <div className="cormorant" style={{ color:"rgba(255,255,255,0.5)",fontSize:15,marginBottom:24 }}>20 April 2026 · Panki, Palamu, Jharkhand, India</div>
          <div style={{ display:"flex",gap:32,justifyContent:"center",flexWrap:"wrap",marginBottom:28 }}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>scrollTo(n.id)} style={{ background:"transparent",border:"none",cursor:"pointer",
                color:"rgba(212,175,55,0.6)",fontFamily:"'Cormorant Garamond',serif",fontSize:15,transition:"color 0.2s" }}
                onMouseEnter={e=>e.target.style.color=G.gold} onMouseLeave={e=>e.target.style.color="rgba(212,175,55,0.6)"}>{n.l}</button>
            ))}
          </div>
          <div style={{ height:1,background:`linear-gradient(90deg,transparent,${G.goldBorder},transparent)`,marginBottom:20 }}/>
          <div className="cormorant" style={{ color:"rgba(212,175,55,0.62)",fontSize:14,letterSpacing:1.4,fontStyle:"italic" }}>
            Created by Sajid Alam
          </div>
          <div className="cormorant" style={{ color:"rgba(212,175,55,0.62)",fontSize:14,letterSpacing:1.4,fontStyle:"italic",display:"none" }}>
            ☪ NIKAH MUBARAK · 2025 ☪
          </div>
        </div>
      </footer>
    </div>
  );
}
