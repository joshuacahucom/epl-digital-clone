import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    title: "Terms of Service | EPL",
    meta: [
      {
        name: "description",
        content:
          "EPL brings together tax strategy, business consulting, fiduciary investment advice, real estate and insurance in Mesa, Arizona.",
      },
      { property: "og:title", content: "Terms of Service | EPL" },
      {
        property: "og:description",
        content:
          "EPL brings together tax strategy, business consulting, fiduciary investment advice, real estate and insurance in Mesa, Arizona.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/webp",
        href: "https://vibe.filesafe.space/1793799115821008382/assets/d99d7638-12aa-4ba1-a7fc-95dd6f6a319e.webp",
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
          '\n<a class="skip" href="#main">Skip to content</a>\n<header class="top"><div class="bar">\n<a aria-label="EPL home" class="brand" href="/"><img alt="EPL" height="50" src="https://vibe.filesafe.space/1793799115821008382/assets/d99d7638-12aa-4ba1-a7fc-95dd6f6a319e.webp" width="50"/></a>\n<button aria-controls="nav" aria-expanded="false" class="menu-btn" type="button">Menu</button>\n<nav aria-label="Main" class="nav" id="nav">\n<ul>\n<li class="has-drop"><button aria-expanded="false" class="l" type="button">Services <svg aria-hidden="true" class="chev" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewbox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></button><div class="drop"><a href="/services"><span class="ic"><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewbox="0 0 24 24"><circle cx="9" cy="8" r="3.5"></circle><path d="M2.5 20c.5-3.5 3-5.5 6.5-5.5s6 2 6.5 5.5M16 5a3.5 3.5 0 0 1 0 6.5M18 15c2 .6 3.2 2.3 3.5 5"></path></svg></span>All Services</a><a href="/consulting"><span class="ic"><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewbox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M15.5 8.5l-2 5-5 2 2-5z"></path></svg></span>Tax Planning and Consulting</a><a href="/investment-advisory"><span class="ic"><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewbox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M21 20H3"></path></svg></span>Fiduciary Investment Advisory</a><a href="/real-estate"><span class="ic"><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewbox="0 0 24 24"><path d="M3 11l9-7 9 7"></path><path d="M5 10v10h14V10M10 20v-6h4v6"></path></svg></span>Real Estate</a><a href="/insurance"><span class="ic"><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewbox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path><path d="M9 12l2 2 4-4"></path></svg></span>Insurance</a><a href="/tax-accounting"><span class="ic"><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewbox="0 0 24 24"><path d="M7 3h7l5 5v13H7z"></path><path d="M14 3v5h5M10 13h6M10 17h6"></path></svg></span>Tax Preparation</a><a href="/tax-accounting#accounting"><span class="ic"><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewbox="0 0 24 24"><rect height="18" rx="2" width="14" x="5" y="3"></rect><path d="M9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"></path></svg></span>Accounting</a></div></li>\n<li><a class="l" href="/about">About</a></li><li><a class="l" href="/tax-resources">Tax Resources</a></li><li><a class="l" href="/client-portal">Client Portal</a></li><li><a class="l" href="/contact">Contact</a></li>\n</ul>\n<a class="btn b-main" href="https://link.eplfs.com/widget/bookings/epl-discovery-call" rel="noopener" target="_blank">Book Complimentary Call</a>\n</nav>\n</div></header>\n<main id="main">\n<section class="ihero"><img alt="" fetchpriority="high" src="https://vibe.filesafe.space/1793799115821008382/assets/d4ed5684-662b-43b1-8c80-4a4df0133c99.webp"/><div class="wrap"><h1>Terms of Service</h1><p>Waiting on EPL\'s approved text.</p></div></section><section class="sec"><div class="wrap"><p>EPL\'s attorney or compliance contact needs to provide this page before the site goes live. Until then, questions can go to <a href="mailto:info@eplfs.com">info@eplfs.com</a> or (480) 831-1731.</p></div></section></main>\n<footer class="foot"><div class="wrap">\n<div class="foot-grid">\n<div>\n<img alt="EPL" class="logo" height="66" loading="lazy" src="https://vibe.filesafe.space/1793799115821008382/assets/d99d7638-12aa-4ba1-a7fc-95dd6f6a319e.webp" width="66"/>\n<p>A fully integrated financial services firm in Mesa, Arizona, offering tax planning and consulting, fiduciary investment advice, real estate, insurance, tax preparation and accounting.</p>\n</div>\n<div><h2>Services</h2><ul><li><a href="/consulting">Tax Planning and Consulting</a></li><li><a href="/investment-advisory">Fiduciary Investment Advisory</a></li><li><a href="/real-estate">Real Estate</a></li><li><a href="/insurance">Insurance</a></li><li><a href="/tax-accounting">Tax Preparation</a></li><li><a href="/tax-accounting#accounting">Accounting</a></li></ul></div>\n<div><h2>Company</h2><ul>\n<li><a href="/about">About</a></li>\n<li><a href="/tax-resources">Tax Resources</a></li>\n<li><a href="/client-portal">Client Portal</a></li>\n<li><a href="/contact">Contact</a></li>\n<li><a href="https://www.facebook.com/eplfinancialservices" rel="noopener" target="_blank">Facebook</a></li>\n<li><a href="https://www.linkedin.com/company/eplfs" rel="noopener" target="_blank">LinkedIn</a></li>\n<li><a href="https://www.instagram.com/eplfs/" rel="noopener" target="_blank">Instagram</a></li>\n</ul></div>\n<div><h2>Reach Us</h2>\n<address><a href="tel:+14808311731">(480) 831-1731</a><br/><a href="mailto:info@eplfs.com">info@eplfs.com</a><br/>\n<a href="https://www.google.com/maps/search/?api=1&amp;query=6065+E+University+Dr+Suite+B+Mesa+AZ+85205" rel="noopener" target="_blank">6065 E. University Drive, Suite B<br/>Mesa, AZ 85205</a></address>\n</div>\n</div>\n<div class="legal">\n<p>EPL companies include EPL Tax Group LLC, EPL Consulting LLC, EPL Investment Advisory LLC, EPL Benefits Group LLC and EPL Realty Group LLC.\n    Each company\'s services and fees are separate, and you are under no obligation to use more than one.</p>\n<p><a href="/privacy">Privacy policy</a> | <a href="/terms">Terms of service</a></p>\n</div>\n</div></footer>\n',
      }}
    />
  );
}
