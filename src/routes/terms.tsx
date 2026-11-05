import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Terms of service | EPL" },
      { name: "description", content: "EPL terms of service." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Terms of service | EPL" },
      { property: "og:description", content: "EPL terms of service." },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content:
          "https://vibe.filesafe.space/1793799115821008382/assets/803fbe07-63da-4ecc-8124-82310e587ab8.png",
      },
      { name: "theme-color", content: "#02383C" },
    ],
    links: [
      {
        rel: "icon",
        href: "https://vibe.filesafe.space/1793799115821008382/assets/d99d7638-12aa-4ba1-a7fc-95dd6f6a319e.webp",
        type: "image/webp",
      },
      {
        rel: "apple-touch-icon",
        href: "https://vibe.filesafe.space/1793799115821008382/assets/d99d7638-12aa-4ba1-a7fc-95dd6f6a319e.webp",
      },
      {
        rel: "preload",
        href: "https://vibe.filesafe.space/1793799115821008382/assets/d94b416f-2d8b-440d-96ba-84ba64ee07b5.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: "/styles.css" },
    ],
    scripts: [{ src: "/site.js", type: "module", defer: true }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          '\n<a class="skip" href="#main">Skip to content</a>\n<header class="top"><div class="bar">\n  <a class="brand" href="/" aria-label="EPL home"><img src="https://vibe.filesafe.space/1793799115821008382/assets/d99d7638-12aa-4ba1-a7fc-95dd6f6a319e.webp" width="50" height="50" alt="EPL"></a>\n  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>\n  <nav class="nav" id="nav" aria-label="Main">\n    <ul>\n      <li class="has-drop"><button class="l" type="button" aria-expanded="false">Services <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="drop"><a href="/services"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.5 3-5.5 6.5-5.5s6 2 6.5 5.5M16 5a3.5 3.5 0 0 1 0 6.5M18 15c2 .6 3.2 2.3 3.5 5"/></svg></span>All services</a><a href="/consulting"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg></span>Tax planning and consulting</a><a href="/investment-advisory"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/></svg></span>Fiduciary investment advisory</a><a href="/real-estate"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/></svg></span>Real estate</a><a href="/insurance"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg></span>Insurance</a><a href="/tax-accounting"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/></svg></span>Tax preparation</a><a href="/tax-accounting#accounting"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/></svg></span>Accounting</a></div></li>\n      <li><a class="l" href="/about">About</a></li><li><a class="l" href="/tax-resources">Tax resources</a></li><li><a class="l" href="/client-portal">Client portal</a></li><li><a class="l" href="/contact">Contact</a></li>\n    </ul>\n    <a class="btn b-main" href="https://calendly.com/eplfinancialservices" target="_blank" rel="noopener">Book a free call</a>\n  </nav>\n</div></header>\n<main id="main">\n<section class="ihero"><img src="https://vibe.filesafe.space/1793799115821008382/assets/d4ed5684-662b-43b1-8c80-4a4df0133c99.webp" alt="" fetchpriority="high"><div class="wrap"><h1>Terms of service</h1><p>Waiting on EPL\'s approved text.</p></div></section><section class="sec"><div class="wrap"><p>EPL\'s attorney or compliance contact needs to provide this page before the site goes live. Until then, questions can go to <a href="mailto:info@eplfs.com">info@eplfs.com</a> or (480) 831-1731.</p></div></section></main>\n<footer class="foot"><div class="wrap">\n  <div class="foot-grid">\n    <div>\n      <img class="logo" src="https://vibe.filesafe.space/1793799115821008382/assets/d99d7638-12aa-4ba1-a7fc-95dd6f6a319e.webp" width="66" height="66" alt="EPL" loading="lazy">\n      <p>A fully integrated financial services firm in Mesa, Arizona, offering tax planning and consulting, fiduciary investment advice, real estate, insurance, tax preparation and accounting.</p>\n    </div>\n    <div><h2>Services</h2><ul><li><a href="/consulting">Tax planning and consulting</a></li><li><a href="/investment-advisory">Fiduciary investment advisory</a></li><li><a href="/real-estate">Real estate</a></li><li><a href="/insurance">Insurance</a></li><li><a href="/tax-accounting">Tax preparation</a></li><li><a href="/tax-accounting#accounting">Accounting</a></li></ul></div>\n    <div><h2>Company</h2><ul>\n      <li><a href="/about">About</a></li>\n      <li><a href="/tax-resources">Tax resources</a></li>\n      <li><a href="/client-portal">Client portal</a></li>\n      <li><a href="/contact">Contact</a></li>\n      <li><a href="https://www.facebook.com/eplfinancialservices" target="_blank" rel="noopener">Facebook</a></li>\n      <li><a href="https://www.linkedin.com/company/eplfs" target="_blank" rel="noopener">LinkedIn</a></li>\n      <li><a href="https://www.instagram.com/eplfs/" target="_blank" rel="noopener">Instagram</a></li>\n    </ul></div>\n    <div><h2>Reach us</h2>\n      <address><a href="tel:+14808311731">(480) 831-1731</a><br><a href="mailto:info@eplfs.com">info@eplfs.com</a><br>\n      <a href="https://www.google.com/maps/search/?api=1&query=6065+E+University+Dr+Suite+B+Mesa+AZ+85205" target="_blank" rel="noopener">6065 E. University Drive, Suite B<br>Mesa, AZ 85205</a></address>\n    </div>\n  </div>\n  <div class="legal">\n    <p>EPL companies include EPL Tax Group LLC, EPL Consulting LLC, EPL Investment Advisory LLC, EPL Benefits Group LLC and EPL Realty Group LLC.\n    Each company\'s services and fees are separate, and you are under no obligation to use more than one.</p>\n    <p><a href="/privacy">Privacy policy</a> | <a href="/terms">Terms of service</a></p>\n  </div>\n</div></footer>\n',
      }}
    />
  );
}
