import { useEffect, useMemo, useRef, useState, useCallback, type FormEvent } from "react";
import {
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";
import { regionName } from "./chat-region-names";
import { chatCopy } from "@/lib/chat-widget-copy";
import type { ChatClient, ChatState, FieldDef } from "./chat-types";

function PhoneField({
  field,
  state,
  onChange,
}: {
  field: FieldDef;
  state: ChatState;
  onChange: (name: string, value: string) => void;
}) {
  const [raw, setRaw] = useState("");
  const [country, setCountry] = useState<CountryCode>(
    (state.detectedCountry as CountryCode) ?? "US",
  );
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!raw && state.detectedCountry) setCountry(state.detectedCountry as CountryCode);
  }, [state.detectedCountry, raw]);

  const countries = useMemo(
    () =>
      getCountries()
        .map((c) => ({ c, name: regionName(c), dial: `+${getCountryCallingCode(c)}` }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const update = useCallback(
    (text: string, c: CountryCode = country) => {
      setRaw(text);
      const p = parsePhoneNumberFromString(text, c);
      onChange(field.value, p?.isValid() ? p.number : "");
    },
    [country, field.value, onChange],
  );

  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="relative flex gap-2">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="cw-phone-dial"
      >
        {country} +{getCountryCallingCode(country)}
      </button>
      {open && (
        <div ref={listRef} role="listbox" className="cw-country-list">
          <input
            autoFocus
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="cw-country-search"
          />
          {countries
            .filter((x) => x.name.toLowerCase().includes(q.toLowerCase()))
            .map((x) => (
              <div
                key={x.c}
                role="option"
                aria-selected={x.c === country}
                onClick={() => {
                  setCountry(x.c);
                  setOpen(false);
                  update(raw, x.c);
                }}
                className="cw-country-option"
              >
                <span>{x.name}</span>
                <span>{x.dial}</span>
              </div>
            ))}
        </div>
      )}
      <input
        type="tel"
        name={field.value}
        required={field.required}
        placeholder={field.placeholder}
        value={raw}
        onChange={(e) => update(e.target.value)}
        className="cw-input cw-input-tel"
      />
    </div>
  );
}

export function ContactForm({ chat, state }: { chat: ChatClient; state: ChatState }) {
  const fields = state.config?.contactForm?.fields ?? [];
  const compliance = state.config?.compliance;
  const [values, setValues] = useState<Record<string, string>>({});
  const [missing, setMissing] = useState<string[]>([]);
  const [consent, setConsent] = useState<boolean>(compliance?.defaultConsentCheck ?? false);
  const [submitting, setSubmitting] = useState(false);

  const setVal = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const miss = fields
      .filter((f) => f.required && !(values[f.value] ?? "").trim())
      .map((f) => f.label);
    if (miss.length) {
      setMissing(miss);
      return;
    }
    if (compliance?.consentRequired && !consent) {
      setMissing(["consent"]);
      return;
    }
    setMissing([]);
    setSubmitting(true);
    const payload = Object.fromEntries(fields.map((f) => [f.value, values[f.value] ?? ""]));
    await chat.submitContactForm({ ...payload, consentGiven: consent });
    setSubmitting(false);
  };

  const phoneError =
    state.error?.field && fields.some((f) => f.value === state.error?.field)
      ? state.error.message
      : undefined;

  return (
    <form onSubmit={onSubmit} className="cw-form">
      {fields.map((f) => (
        <label key={f.value} className="cw-field">
          <span className="cw-field-label">
            {f.label}
            {f.required ? " *" : ""}
          </span>
          {f.dataType === "PHONE" ? (
            <PhoneField field={f} state={state} onChange={setVal} />
          ) : f.dataType === "EMAIL" ? (
            <input
              type="email"
              name={f.value}
              required={f.required}
              placeholder={f.placeholder}
              value={values[f.value] ?? ""}
              onChange={(e) => setVal(f.value, e.target.value)}
              className="cw-input"
            />
          ) : f.dataType === "TEXTAREA" ? (
            <textarea
              name={f.value}
              required={f.required}
              placeholder={f.placeholder}
              value={values[f.value] ?? ""}
              onChange={(e) => setVal(f.value, e.target.value)}
              className="cw-input cw-textarea"
            />
          ) : (
            <input
              type="text"
              name={f.value}
              required={f.required}
              placeholder={f.placeholder}
              value={values[f.value] ?? ""}
              onChange={(e) => setVal(f.value, e.target.value)}
              className="cw-input"
            />
          )}
          {state.error?.field === f.value && state.error.message && (
            <span className="cw-field-error">{state.error.message}</span>
          )}
        </label>
      ))}

      {compliance?.showConsentCheckbox && compliance.consentText && (
        <label className="cw-consent">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>{compliance.consentText}</span>
        </label>
      )}

      {missing.length > 0 && (
        <div className="cw-form-error">
          {missing.includes("consent")
            ? "Please accept the consent notice to continue."
            : `Please fill in: ${missing.join(", ")}`}
        </div>
      )}
      {phoneError && <div className="cw-form-error">{phoneError}</div>}
      {state.error && !state.error.field && state.error.message && (
        <div className="cw-form-error">{state.error.message}</div>
      )}

      <button
        type="submit"
        disabled={submitting || state.requestState === "in_progress" || state.captchaRequired}
        className="cw-btn cw-btn-primary"
      >
        {submitting || state.requestState === "in_progress" ? "Sending…" : chatCopy.submitFormLabel}
      </button>
    </form>
  );
}
