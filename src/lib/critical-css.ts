// Critical above-the-fold CSS: base reset, design tokens, floating header,
// home hero, inner-page hero, buttons, skip link, and the entrance-animation
// rule. Inlined in <head> so the header and hero paint before the full
// stylesheet (loaded non-blockingly) arrives. Keep this in sync with the
// matching rules in public/styles.css — do not diverge visually.
export const criticalCss = `
@font-face{font-family:"Manrope";src:url(https://vibe.filesafe.space/1793799115821008382/assets/d94b416f-2d8b-440d-96ba-84ba64ee07b5.woff2) format("woff2");font-weight:200 800;font-display:swap}
:root{--teal:#007A7F;--bright:#17B5BA;--aqua:#8FE3E5;--deep:#02383C;--deeper:#012629;--ink:#0A2B2E;--text:#3E5A5C;--mist:#EFF7F7;--line:#D6E7E7;--white:#fff;--r-lg:28px;--r-md:20px;--r-sm:14px;--font:"Manrope",system-ui,-apple-system,"Segoe UI",sans-serif;--gutter:clamp(18px,4vw,48px);--shadow:0 18px 50px -22px rgba(2,56,60,.35)}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:#fff;color:var(--text);font:400 1.0625rem/1.65 var(--font);-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%;height:auto}
a{color:var(--teal);text-underline-offset:.18em}
h1,h2,h3{color:var(--ink);font-family:var(--font);font-weight:800;line-height:1.08;margin:0;letter-spacing:-.028em;text-wrap:balance}
ul{margin:0;padding:0;list-style:none}
.skip{position:absolute;left:-999px;top:0;background:#fff;padding:.6em 1em;z-index:60}
.skip:focus{left:8px;top:8px}
.wrap{max-width:1240px;margin-inline:auto;padding-inline:var(--gutter)}
.top{position:sticky;top:10px;z-index:50;padding-inline:var(--gutter);margin-top:10px;margin-bottom:-88px;height:78px}
.bar{max-width:1240px;margin-inline:auto;height:68px;background:rgba(255,255,255,.93);backdrop-filter:saturate(1.6) blur(14px);-webkit-backdrop-filter:saturate(1.6) blur(14px);border:1px solid rgba(255,255,255,.7);border-radius:999px;box-shadow:0 10px 34px -14px rgba(1,38,41,.45);display:flex;align-items:center;gap:1rem;padding:0 .7rem 0 .75rem;position:relative}
.brand img{width:50px;height:50px}
.nav{margin-left:auto;display:flex;align-items:center;gap:1rem}
.nav>ul{display:flex;align-items:center;gap:.15rem}
.nav>ul>li{position:relative}
.nav a.l,.nav button.l{display:flex;align-items:center;gap:.3rem;background:none;border:0;cursor:pointer;font:600 .96rem/1 var(--font);color:var(--ink);text-decoration:none;padding:.72rem .85rem;border-radius:999px}
.nav a.l:hover,.nav button.l:hover,.nav a.l[aria-current=page]{background:var(--mist);color:var(--teal)}
.chev{width:14px;height:14px;transition:transform .15s}
.drop{display:none;position:absolute;left:0;top:calc(100% + 10px);width:330px;background:#fff;border-radius:var(--r-md);box-shadow:0 24px 60px -18px rgba(1,38,41,.45);padding:.55rem}
.drop::before{content:"";position:absolute;left:0;right:0;top:-12px;height:12px}
.has-drop:hover .drop,.has-drop:focus-within .drop,.has-drop.open .drop{display:block}
.has-drop:hover .chev,.has-drop.open .chev{transform:rotate(180deg)}
.drop a{display:flex;gap:.8rem;align-items:center;padding:.6rem .7rem;border-radius:var(--r-sm);color:var(--ink);text-decoration:none;font-weight:600;font-size:.97rem}
.drop a:hover{background:var(--mist)}
.ic{flex:none;width:38px;height:38px;border-radius:12px;background:var(--mist);color:var(--teal);display:grid;place-items:center}
.ic svg{width:21px;height:21px}
.menu-btn{display:none;margin-left:auto;background:var(--mist);border:0;color:var(--ink);font:700 .95rem var(--font);padding:.72rem 1.1rem;border-radius:999px;cursor:pointer}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;font:700 1rem/1.1 var(--font);padding:1rem 1.5rem;border-radius:999px;text-decoration:none;border:0;cursor:pointer;transition:transform .15s,background-color .15s,box-shadow .15s}
.btn:hover{transform:translateY(-2px)}
.b-main{background:var(--teal);color:#fff;box-shadow:0 12px 28px -12px rgba(0,122,127,.8)}
.b-main:hover{background:#00696D;color:#fff}
.b-light{background:#fff;color:var(--deep)}
.b-light:hover{background:var(--aqua);color:var(--deep)}
.b-ghost{background:rgba(255,255,255,.1);color:#fff;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.45)}
.b-ghost:hover{background:rgba(255,255,255,.2);color:#fff}
.nav .b-main{padding:.85rem 1.2rem;font-size:.95rem;white-space:nowrap}
.btns{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:2rem}
.hero{position:relative;background:var(--deep);color:#fff;overflow:hidden;isolation:isolate}
.hero-bg{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover}
.hero::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(100deg,rgba(1,38,41,.97) 0%,rgba(2,56,60,.9) 48%,rgba(0,122,127,.62) 100%)}
.hero-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:clamp(2rem,5vw,5rem);align-items:center;padding-block:clamp(8rem,12vw,10.5rem) clamp(7rem,10vw,9.5rem)}
.hero h1{color:#fff;font-size:clamp(2.75rem,6vw,5.1rem);line-height:1.02;letter-spacing:-.035em}
.hero .lede{font-size:clamp(1.1rem,1.5vw,1.28rem);line-height:1.6;margin-top:1.5rem;color:#D9EFF0;max-width:36rem}
.helpbox{background:rgba(255,255,255,.97);color:var(--text);border-radius:var(--r-lg);padding:clamp(1.3rem,2.2vw,1.9rem);box-shadow:0 30px 70px -28px rgba(0,0,0,.75)}
.helpbox h2{font-size:1.55rem;letter-spacing:-.02em}
.helpbox>p{margin:.35rem 0 1rem;font-size:.98rem}
.helpbox ul{display:grid;grid-template-columns:1fr 1fr;gap:.55rem}
.helpbox li a{display:flex;align-items:center;gap:.65rem;height:100%;padding:.6rem;border-radius:var(--r-sm);box-shadow:inset 0 0 0 1px var(--line);color:var(--ink);font-weight:700;font-size:.94rem;line-height:1.2;text-decoration:none}
.helpby{display:flex;align-items:center;gap:.8rem;margin-top:1.1rem;padding-top:1rem;border-top:1px solid var(--line);font-size:.92rem;line-height:1.3}
.helpby img{width:48px;height:48px;border-radius:50%;object-fit:cover;flex:none}
.helpby b{display:block;color:var(--ink)}
.ihero{position:relative;background:var(--deep);overflow:hidden;isolation:isolate;color:#D9EFF0}
.ihero img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover}
.ihero::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(95deg,rgba(1,38,41,.97) 5%,rgba(2,56,60,.86) 55%,rgba(0,122,127,.45) 100%)}
.ihero .wrap{padding-block:clamp(8rem,12vw,10.5rem) clamp(3.5rem,6vw,5.5rem)}
.ihero h1{color:#fff;font-size:clamp(2.5rem,5vw,4.2rem);max-width:15em;letter-spacing:-.033em}
.ihero p{font-size:clamp(1.08rem,1.4vw,1.25rem);line-height:1.6;margin-top:1.1rem;max-width:40rem}
.crumb{font-size:.92rem;margin-bottom:1rem;color:var(--aqua)}
.crumb a{color:var(--aqua);text-decoration:none}
@media (prefers-reduced-motion:no-preference){.js .rise{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s cubic-bezier(.2,.7,.2,1)}.js .rise.in{opacity:1;transform:none}}
@media (max-width:1040px){.menu-btn{display:block}.nav{display:none;position:absolute;left:0;right:0;top:calc(100% + 8px);background:#fff;border-radius:var(--r-md);box-shadow:0 24px 60px -18px rgba(1,38,41,.5);padding:.7rem;flex-direction:column;align-items:stretch;max-height:calc(100vh - 110px);overflow:auto}.nav.open{display:flex}.nav>ul{flex-direction:column;align-items:stretch}.nav a.l,.nav button.l{width:100%;justify-content:space-between;font-size:1.05rem;padding:.9rem .85rem}.drop{position:static;width:auto;box-shadow:none;padding:0 0 .3rem}.has-drop:hover .drop,.has-drop:focus-within .drop{display:none}.has-drop.open .drop{display:block}.nav .b-main{width:100%;padding:1rem}.hero-grid{grid-template-columns:minmax(0,1fr)}}
@media (max-width:680px){body{font-size:1.02rem}.top{padding-inline:12px;height:70px;margin-bottom:-80px}.bar{height:60px;padding:0 .5rem}.brand img{width:44px;height:44px}.hero-grid{padding-block:7rem 6rem}.ihero .wrap{padding-block:7rem 3rem}}
`;
