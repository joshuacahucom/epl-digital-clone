import { useEffect, useRef, useState, useCallback } from "react";
import { chatWidgetConfig, loadChatCore } from "@/lib/chat-widget-config";
import { chatCopy } from "@/lib/chat-widget-copy";
import type { ChatClient, ChatState } from "./chat-types";
import { MessageBubble, AttachmentChip } from "./chat-message";
import { ContactForm } from "./chat-form";

export function ChatWidget() {
  const [state, setState] = useState<ChatState>({});
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState<ChatClient | null>(null);
  const [quickReplied, setQuickReplied] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const clientRef = useRef<ChatClient | null>(null);
  const prevCount = useRef(0);

  // create client + subscribe
  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      try {
        const mod = await loadChatCore(chatWidgetConfig.coreUrl);
        const createChatClient: (opts: Record<string, string>) => ChatClient = mod.createChatClient;
        const chat = createChatClient({
          locationId: chatWidgetConfig.locationId,
          widgetId: chatWidgetConfig.chatWidgetId,
          marketplaceUrl: chatWidgetConfig.marketplaceUrl,
          source: chatWidgetConfig.source,
        });
        if (cancelled) {
          chat.close();
          return;
        }
        clientRef.current = chat;
        setClient(chat);
        unsub = chat.subscribe(setState);
      } catch {
        setState({ error: { message: "Couldn't load the chat. Please try again." } });
      }
    })();
    return () => {
      cancelled = true;
      unsub?.();
      clientRef.current?.close();
    };
  }, []);

  const openChat = useCallback(() => {
    setOpen(true);
    const chat = clientRef.current;
    if (chat) {
      chat.setPanelOpen(true);
      chat.open().catch(() => {});
    }
  }, []);

  // run open() once client exists if user already clicked
  useEffect(() => {
    if (open && client) {
      client.setPanelOpen(true);
      client.open().catch(() => {});
    }
  }, [open, client]);

  // captcha anchor
  useEffect(() => {
    if (client && panelRef.current) client.setCaptchaAnchor(panelRef.current);
  }, [client, open]);

  // autoscroll on append
  useEffect(() => {
    const t = threadRef.current;
    if (!t) return;
    const count = state.messages?.length ?? 0;
    if (count > prevCount.current) t.scrollTop = t.scrollHeight;
    prevCount.current = count;
  }, [state.messages]);

  // prefetch on idle
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onIdle = () => loadChatCore(chatWidgetConfig.coreUrl).catch(() => {});
    if ("requestIdleCallback" in window) (window as any).requestIdleCallback(onIdle);
    else setTimeout(onIdle, 2000);
  }, []);

  const close = () => {
    setOpen(false);
    clientRef.current?.setPanelOpen(false);
  };

  const send = async () => {
    const chat = clientRef.current;
    if (!chat || !state.canSend) return;
    const uploading = (state.attachments ?? []).some((a) => a.status === "uploading");
    const ready = (state.attachments ?? [])
      .filter((a) => a.status === "uploaded")
      .map((a) => a.url!) as string[];
    if (uploading) return;
    if (!text.trim() && ready.length === 0) return;
    const t = text;
    setText("");
    await chat.sendMessage({ text: t, attachments: ready });
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !clientRef.current) return;
    await clientRef.current.uploadAttachment(f);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && clientRef.current) await clientRef.current.uploadAttachment(f);
  };

  const sendQuickReply = (href: string) => {
    setQuickReplied(true);
    if (href.startsWith("http")) window.open(href, "_blank", "noopener");
    else window.location.href = href;
  };

  const isLive = state.activeChatType === "liveChat";
  const isEmail = state.activeChatType === "emailChat";
  const attachmentsCfg = state.config?.liveChat?.attachments;
  const showQuickReplies =
    isLive &&
    !quickReplied &&
    (state.messages?.length ?? 0) === 0 &&
    !state.showContactForm &&
    !state.feedbackRequested &&
    !state.feedbackSubmitted &&
    !state.ended;

  const uploading = (state.attachments ?? []).some((a) => a.status === "uploading");
  const showComposer =
    isLive &&
    !state.showContactForm &&
    !state.feedbackRequested &&
    !state.feedbackSubmitted &&
    !state.ended;
  const showCard =
    isLive &&
    (state.showContactForm || state.feedbackRequested || state.feedbackSubmitted || state.ended);

  return (
    <>
      <button
        type="button"
        aria-label={chatCopy.launcherLabel}
        aria-expanded={open}
        onClick={() => (open ? close() : openChat())}
        className="cw-launcher"
        onMouseEnter={() => loadChatCore(chatWidgetConfig.coreUrl).catch(() => {})}
      >
        {!open && (state.unreadCount ?? 0) > 0 && (
          <span className="cw-badge">{state.unreadCount}</span>
        )}
        {open ? (
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
          </svg>
        )}
      </button>

      {!open && (
        <button type="button" onClick={openChat} className="cw-teaser">
          {chatCopy.teaser}
        </button>
      )}

      {open && (
        <div
          ref={panelRef}
          className="cw-panel"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <header className="cw-head">
            <div>
              <div className="cw-head-title">{chatCopy.heading}</div>
              <div className="cw-head-sub">{chatCopy.subheading}</div>
            </div>
            <button type="button" aria-label="Close" onClick={close} className="cw-close">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div ref={threadRef} className="cw-thread">
            {!state.config && (
              <div className="cw-center">
                {state.error ? (
                  <>
                    <p className="cw-err">{state.error.message}</p>
                    <button
                      type="button"
                      className="cw-btn cw-btn-ghost"
                      onClick={() => clientRef.current?.open()}
                    >
                      {chatCopy.retryText}
                    </button>
                  </>
                ) : (
                  <p className="cw-loading">{chatCopy.loadingText}</p>
                )}
              </div>
            )}

            {state.config && state.awaitingChatTypeSelection && (
              <div className="cw-center cw-typepick">
                <button
                  type="button"
                  className="cw-btn cw-btn-primary"
                  onClick={() => clientRef.current?.setActiveChatType("liveChat")}
                >
                  {chatCopy.startChatLabel}
                </button>
                <button
                  type="button"
                  className="cw-btn cw-btn-ghost"
                  onClick={() => clientRef.current?.setActiveChatType("emailChat")}
                >
                  {chatCopy.smsEmailLabel}
                </button>
              </div>
            )}

            {state.config && isEmail && (
              <div className="cw-center">
                {state.contactFormSubmitted ? (
                  <div className="cw-thanks">
                    <p className="cw-thanks-title">{chatCopy.emailThankYou}</p>
                    <p className="cw-thanks-hint">{chatCopy.emailThankYouHint}</p>
                  </div>
                ) : (
                  <ContactForm chat={clientRef.current!} state={state} />
                )}
              </div>
            )}

            {state.config && isLive && (
              <>
                {state.hasMoreHistory && (
                  <button
                    type="button"
                    className="cw-history"
                    onClick={() => clientRef.current?.loadOlderMessages()}
                    disabled={state.historyLoading}
                  >
                    {state.historyLoading ? "…" : chatCopy.historyText}
                  </button>
                )}
                {(state.messages ?? []).map((m) => (
                  <MessageBubble key={m.id} m={m} />
                ))}
                {state.agentTyping && (
                  <div className="cw-msg cw-msg-in cw-typing">
                    <div className="cw-typing-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {showQuickReplies && (
            <div className="cw-quickreplies">
              {chatCopy.quickReplies.map((qr) => (
                <button
                  key={qr.label}
                  type="button"
                  className="cw-quickreply"
                  onClick={() => sendQuickReply(qr.href)}
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {showCard && (
            <div className="cw-card">
              {state.showContactForm && <ContactForm chat={clientRef.current!} state={state} />}
              {state.feedbackRequested && !state.feedbackSubmitted && (
                <div className="cw-feedback">
                  <p className="cw-feedback-prompt">
                    {state.config?.liveChat?.feedbackMessage ?? chatCopy.feedbackPrompt}
                  </p>
                  <div className="cw-feedback-btns">
                    <button
                      type="button"
                      onClick={() => clientRef.current?.sendFeedback("positive")}
                      aria-label={chatCopy.feedbackPositive}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 11v8a1 1 0 0 0 1 1h9.5a2 2 0 0 0 1.9-1.4l1.4-4.6A1 1 0 0 0 20 13h-5a1 1 0 0 1-1-1l1-4a2 2 0 0 0-2-2.4L8 11z" />
                        <path d="M7 11H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => clientRef.current?.sendFeedback("negative")}
                      aria-label={chatCopy.feedbackNegative}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 13V5a1 1 0 0 0-1-1H6.5a2 2 0 0 0-1.9 1.4L3.2 10A1 1 0 0 0 4 11h5a1 1 0 0 1 1 1l-1 4a2 2 0 0 0 2 2.4L16 13z" />
                        <path d="M17 13h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-3" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {state.feedbackSubmitted && !state.feedbackRequested && (
                <div className="cw-feedback-done">
                  <p className="cw-feedback-note">{state.config?.liveChat?.feedbackNote}</p>
                  <button
                    type="button"
                    className="cw-btn cw-btn-ghost"
                    onClick={() => clientRef.current?.restartConversation()}
                  >
                    {chatCopy.restartLabel}
                  </button>
                </div>
              )}
              {state.ended && (
                <div className="cw-ended">
                  {(state.endedReason === "agent_unavailable" ||
                    state.endedReason === "outside_office_hours") && (
                    <p className="cw-ended-hint">{chatCopy.provideDetailsHint}</p>
                  )}
                  {state.endedReason === "acknowledged" && (
                    <p className="cw-ended-hint">{chatCopy.requestFeedbackHint}</p>
                  )}
                  <button
                    type="button"
                    className="cw-btn cw-btn-primary"
                    onClick={() => clientRef.current?.restartConversation()}
                  >
                    {chatCopy.restartLabel}
                  </button>
                </div>
              )}
            </div>
          )}

          {showComposer && (
            <div className="cw-composer">
              {state.connection === "reconnecting" && (
                <div className="cw-status">{chatCopy.reconnectingText}</div>
              )}
              {state.connection === "offline" && (
                <div className="cw-status">{chatCopy.offlineText}</div>
              )}
              {state.error &&
                !state.error.field &&
                state.error.message &&
                !state.captchaRequired && (
                  <div className="cw-status cw-status-err">{state.error.message}</div>
                )}
              {(state.attachments ?? []).length > 0 && (
                <div className="cw-chips">
                  {(state.attachments ?? []).map((a) => (
                    <AttachmentChip
                      key={a.id}
                      a={a}
                      onRemove={(id) => clientRef.current?.removeAttachment(id)}
                    />
                  ))}
                </div>
              )}
              <div className="cw-composer-row">
                {attachmentsCfg?.enabled && (
                  <>
                    <button
                      type="button"
                      aria-label={chatCopy.attachLabel}
                      className="cw-attach"
                      disabled={(state.attachments ?? []).length >= (attachmentsCfg.maxFiles ?? 1)}
                      onClick={() => fileRef.current?.click()}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5l-8.5 8.5a5 5 0 0 1-7-7l8-8a3.5 3.5 0 0 1 5 5l-8 8a2 2 0 0 1-3-3l7.5-7.5" />
                      </svg>
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept={attachmentsCfg.acceptedTypes?.join(",")}
                      className="cw-file-hidden"
                      onChange={onFile}
                    />
                  </>
                )}
                <textarea
                  rows={1}
                  className="cw-composer-input"
                  placeholder={chatCopy.composerPlaceholder}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  disabled={state.captchaRequired}
                />
                <button
                  type="button"
                  aria-label={chatCopy.sendLabel}
                  className="cw-send"
                  disabled={
                    !state.canSend ||
                    uploading ||
                    state.captchaRequired ||
                    (!text.trim() &&
                      (state.attachments ?? []).every((a) => a.status !== "uploaded"))
                  }
                  onClick={send}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
