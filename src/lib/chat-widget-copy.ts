// Site-owned chat copy. The welcome_message (first in-thread line) lives on the
// widget record; this file holds the panel chrome, teaser, quick replies and
// thank-you wording that the site renders itself.

export const chatCopy = {
  heading: "Have a question?",
  subheading: "We're here to help with taxes, investments, real estate and insurance.",
  teaser: "Hi there! Chat with the EPL team.",
  launcherLabel: "Chat with us",
  quickReplies: [
    {
      label: "Book a free call",
      action: "link",
      href: "https://calendly.com/eplfinancialservices",
    },
    { label: "Upload documents", action: "link", href: "/client-portal" },
    { label: "Tax resources", action: "link", href: "/tax-resources" },
    { label: "Contact the team", action: "link", href: "/contact" },
  ],
  loadingText: "Starting your chat…",
  retryText: "Try again",
  reconnectingText: "Reconnecting…",
  offlineText: "You're offline — messages will send when you're back.",
  historyText: "Load older messages",
  emailThankYou: "Thanks! We've got your details and will be in touch soon.",
  emailThankYouHint: "Keep this window open, or close it — we'll reach out by email.",
  composerPlaceholder: "Type a message…",
  sendLabel: "Send",
  attachLabel: "Attach a file",
  startChatLabel: "Start live chat",
  smsEmailLabel: "Send a message instead",
  backLabel: "Back",
  submitFormLabel: "Send",
  feedbackPrompt: "How did we do today?",
  feedbackPositive: "Good",
  feedbackNegative: "Bad",
  restartLabel: "Start a new chat",
  provideDetailsHint: "Share your name and contact so an agent can reach you.",
  requestFeedbackHint: "We'd love your feedback before you go.",
};
