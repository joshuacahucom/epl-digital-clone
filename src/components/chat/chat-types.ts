// Shared types for the chat widget. The chat core owns the real types;
// these are the minimal shapes the presentation layer relies on.
export type Direction = "inbound" | "outbound" | "system";
export type MsgStatus = "pending" | "sent" | "failed";

export interface ChatMessage {
  id: string;
  body?: string;
  direction: Direction;
  status?: MsgStatus;
  dateAdded?: string;
  attachments?: string[];
}

export type Connection = "idle" | "connecting" | "connected" | "reconnecting" | "offline";
export type RequestState = "idle" | "in_progress" | "completed";
export type ChatType = "liveChat" | "emailChat";

export interface FieldDef {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  dataType?: string;
}

export interface ComplianceConfig {
  consentText?: string;
  showConsentCheckbox?: boolean;
  defaultConsentCheck?: boolean;
  consentRequired?: boolean;
}

export interface ContactFormConfig {
  enabled?: boolean;
  fields?: FieldDef[];
}

export interface AttachmentsConfig {
  enabled?: boolean;
  maxFiles?: number;
  maxFileSizeBytes?: number;
  acceptedTypes?: string[];
}

export interface LiveChatConfig {
  feedbackMessage?: string;
  feedbackNote?: string;
  attachments?: AttachmentsConfig;
}

export interface ChatConfig {
  contactForm?: ContactFormConfig;
  compliance?: ComplianceConfig;
  liveChat?: LiveChatConfig;
}

export interface ChatError {
  message?: string;
  field?: string;
  code?: string;
}

export interface Attachment {
  id: string;
  name?: string;
  status: "uploading" | "uploaded" | "failed";
  progress?: number;
  url?: string;
  failureText?: string;
}

export interface ChatState {
  config?: ChatConfig;
  messages?: ChatMessage[];
  isOpen?: boolean;
  awaitingChatTypeSelection?: boolean;
  activeChatType?: ChatType | null;
  showContactForm?: boolean;
  contactFormSubmitted?: boolean;
  feedbackRequested?: boolean;
  feedbackSubmitted?: boolean;
  ended?: boolean;
  endedReason?: string;
  canSend?: boolean;
  sendBlockedUntil?: number | null;
  captchaRequired?: boolean;
  captchaStatusMessage?: string;
  rateLimited?: boolean;
  connection?: Connection;
  requestState?: RequestState;
  error?: ChatError | null;
  agentTyping?: boolean;
  unreadCount?: number;
  hasMoreHistory?: boolean;
  historyLoading?: boolean;
  attachments?: Attachment[];
  detectedCountry?: string | null;
}

export interface ChatClient {
  subscribe: (cb: (s: ChatState) => void) => () => void;
  setPanelOpen: (open: boolean) => void;
  open: () => Promise<void>;
  close: () => void;
  sendMessage: (m: { text: string; attachments?: string[] }) => Promise<void>;
  setActiveChatType: (t: ChatType | null) => void;
  submitContactForm: (payload: Record<string, unknown>) => Promise<void>;
  sendFeedback: (f: "positive" | "negative") => Promise<void>;
  restartConversation: () => Promise<void>;
  loadOlderMessages: () => Promise<void>;
  uploadAttachment: (file: File) => Promise<void>;
  removeAttachment: (id: string) => void;
  setCaptchaAnchor: (el: HTMLElement | null) => void;
  reset: () => void;
}

export const kind = (u: string) =>
  /\.(mp4|mov|webm)(\?|$)/i.test(u)
    ? "video"
    : /\.(mp3|m4a|wav|ogg)(\?|$)/i.test(u)
      ? "audio"
      : /\.(png|jpe?g|gif|webp|heic)(\?|$)/i.test(u)
        ? "image"
        : "file";

export const fmtTime = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
