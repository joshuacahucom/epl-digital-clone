// Chat widget integration config (live chat).
// Values come from the connected chat widget selection.
export const chatWidgetConfig = {
  chatWidgetId: "6aebf98fce7c96a75a7147b1",
  locationId: "fif183yujGhp21dM2V8d",
  coreUrl: "https://widgets.leadconnectorhq.com/chat-widget-core/core.esm.js",
  marketplaceUrl: "https://services.leadconnectorhq.com",
  source: "ai-studio-native",
  chatType: "liveChat" as const,
};

let corePromise: Promise<any> | null = null;
export const loadChatCore = (url: string) => (corePromise ??= import(/* @vite-ignore */ url));
