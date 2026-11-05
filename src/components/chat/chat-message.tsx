import { kind, fmtTime, type ChatMessage } from "./chat-types";

export function MessageBubble({ m }: { m: ChatMessage }) {
  if (m.direction === "system") {
    return <div className="cw-msg cw-msg-system">{m.body}</div>;
  }
  const inbound = m.direction === "inbound";
  return (
    <div className={`cw-msg ${inbound ? "cw-msg-in" : "cw-msg-out"}`} data-status={m.status}>
      <div className="cw-msg-body">
        {m.body}
        {m.attachments?.map((u) => {
          const k = kind(u);
          if (k === "image")
            return (
              <a key={u} href={u} target="_blank" rel="noopener">
                <img src={u} alt="" className="cw-att-img" />
              </a>
            );
          if (k === "video") return <video key={u} src={u} controls className="cw-att-media" />;
          if (k === "audio") return <audio key={u} src={u} controls className="cw-att-media" />;
          return (
            <a key={u} href={u} target="_blank" rel="noopener" className="cw-att-file">
              {u.split("/").pop() ?? "file"}
            </a>
          );
        })}
      </div>
      <div className="cw-msg-time">
        {m.status === "pending" ? "…" : m.status === "failed" ? "failed" : fmtTime(m.dateAdded)}
      </div>
    </div>
  );
}

export function AttachmentChip({
  a,
  onRemove,
}: {
  a: import("./chat-types").Attachment;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="cw-chip" data-status={a.status}>
      <span className="cw-chip-name">{a.name ?? "file"}</span>
      {a.status === "uploading" && (
        <span className="cw-chip-progress">{Math.round((a.progress ?? 0) * 100)}%</span>
      )}
      {a.status === "failed" && <span className="cw-chip-fail">{a.failureText ?? "failed"}</span>}
      <button type="button" className="cw-chip-remove" onClick={() => onRemove(a.id)}>
        ×
      </button>
    </div>
  );
}
