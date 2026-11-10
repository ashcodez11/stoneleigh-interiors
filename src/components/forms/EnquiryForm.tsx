"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { ArrowRight } from "@/components/ui/icons";

type FieldName = "name" | "phone" | "email" | "propertyType" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "error";

/**
 * Sentinel shared with `/api/enquiry` for a visitor who has not settled on a
 * service yet. The API accepts this slug alongside the six service slugs.
 */
const NOT_SURE_SERVICE = "not-sure";

/** Property-type options — the same values are validated by `/api/enquiry`. */
const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa / Independent house" },
  { value: "penthouse", label: "Penthouse" },
  { value: "duplex", label: "Duplex" },
  { value: "under-construction", label: "Under construction" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

/** Retained so a retry can resend the exact same values. */
type Payload = {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  service: string;
  message: string;
  company: string;
};

/** A failed submission plus whether retrying the identical values may help. */
type Failure = {
  message: string;
  retryable: boolean;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Plausible Indian phone: ten national digits (an optional +91 or leading 0 is
 * accepted and stripped), starting 6–9. Mirrors the server-side check.
 */
function isPlausibleIndianPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  let national = digits;
  if (digits.length === 12 && digits.startsWith("91")) national = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) national = digits.slice(1);
  return /^[6-9]\d{9}$/.test(national);
}

/** Abort a hanging request so it surfaces as a network failure, not a spin. */
const REQUEST_TIMEOUT_MS = 15_000;

const OFFLINE_MESSAGE =
  "You appear to be offline. Please check your connection and try again.";
const NETWORK_MESSAGE =
  "We could not reach the studio just now. Please check your connection and try again.";
const NOT_CONFIGURED_MESSAGE =
  "The enquiry form is not connected to the studio's mailbox yet, so your message cannot be delivered right now. Please try again shortly, or visit us at the studio address below.";
const VALIDATION_MESSAGE =
  "Please check your details and try again.";
const DELIVERY_MESSAGE =
  "Your enquiry could not be delivered just now. Please try again shortly.";

/**
 * Project enquiry form.
 *
 * Client-side validation mirrors the server checks in `/api/enquiry`; the
 * server also applies a honeypot + minimum-time spam guard. Delivery is
 * intentionally pluggable — until the studio supplies a delivery channel the
 * API returns an actionable message instead of pretending the enquiry was sent.
 */
export function EnquiryForm() {
  const router = useRouter();
  const baseId = useId();
  const mountedAt = useRef(0);
  const inFlight = useRef(false);
  const submitted = useRef(false);
  const lastPayload = useRef<Payload | null>(null);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<Failure | null>(null);
  const [online, setOnline] = useState(true);

  // Recorded after mount so the timestamp never runs during prerendering.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Mirror the browser's connectivity so we can guide an offline visitor
  // before they waste a submission.
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  const fieldId = (name: string) => `${baseId}-${name}`;
  const errorId = (name: string) => `${baseId}-${name}-error`;

  /**
   * Single delivery path shared by the form and the "Try again" retry, so a
   * retry resends the same values through the same guards and error handling.
   */
  async function send(payload: Payload) {
    // Block re-entry while a request is in flight, and after a success.
    if (inFlight.current || submitted.current) return;

    if (!online) {
      setStatus("error");
      setFailure({ message: OFFLINE_MESSAGE, retryable: true });
      return;
    }

    inFlight.current = true;
    setStatus("submitting");
    setFailure(null);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          elapsedMs: Date.now() - mountedAt.current,
        }),
        signal: controller.signal,
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; code?: string }
        | null;

      if (response.ok && result?.ok) {
        submitted.current = true;
        router.push("/thank-you");
        return;
      }

      const serverMessage = result?.message;
      const channelNotConfigured =
        response.status === 503 || result?.code === "CHANNEL_NOT_CONFIGURED";

      if (channelNotConfigured) {
        // The studio has not connected a delivery channel yet — say so plainly.
        setStatus("error");
        setFailure({
          message: serverMessage ?? NOT_CONFIGURED_MESSAGE,
          retryable: true,
        });
      } else if (response.status >= 500) {
        setStatus("error");
        setFailure({ message: serverMessage ?? DELIVERY_MESSAGE, retryable: true });
      } else {
        // 400 / 422 — validation or spam guard; retrying unchanged is pointless.
        setStatus("error");
        setFailure({ message: serverMessage ?? VALIDATION_MESSAGE, retryable: false });
      }
    } catch {
      // Network failure, or the 15s timeout firing the abort.
      setStatus("error");
      setFailure({
        message: online ? NETWORK_MESSAGE : OFFLINE_MESSAGE,
        retryable: true,
      });
    } finally {
      window.clearTimeout(timeoutId);
      inFlight.current = false;
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || submitted.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const values = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      propertyType: String(data.get("propertyType") ?? "").trim(),
      service: String(data.get("service") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const nextErrors: Errors = {};
    if (values.name.length < 2) nextErrors.name = "Please tell us your name.";
    if (!EMAIL.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    if (!isPlausibleIndianPhone(values.phone))
      nextErrors.phone = "Please enter a valid phone number (10 digits, e.g. 98765 43210).";
    if (!values.propertyType) nextErrors.propertyType = "Please select a property type.";
    if (values.message.length < 10)
      nextErrors.message = "A little more detail helps us help you (10+ characters).";

    setErrors(nextErrors);
    setFailure(null);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    const payload: Payload = {
      ...values,
      company: String(data.get("company") ?? ""),
    };
    lastPayload.current = payload;
    await send(payload);
  }

  async function handleRetry() {
    if (!lastPayload.current) return;
    await send(lastPayload.current);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor={fieldId("name")}>
            Your name *
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            className="field"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
          />
          {errors.name && (
            <p id={errorId("name")} role="alert" className="mt-2 text-xs text-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor={fieldId("email")}>
            Email *
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
          />
          {errors.email && (
            <p id={errorId("email")} role="alert" className="mt-2 text-xs text-error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor={fieldId("phone")}>
            Phone *
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className="field"
            placeholder="e.g. 98765 43210"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
          />
          {errors.phone && (
            <p id={errorId("phone")} role="alert" className="mt-2 text-xs text-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor={fieldId("propertyType")}>
            Property type *
          </label>
          <select
            id={fieldId("propertyType")}
            name="propertyType"
            required
            className="field"
            defaultValue=""
            aria-invalid={Boolean(errors.propertyType)}
            aria-describedby={errors.propertyType ? errorId("propertyType") : undefined}
          >
            <option value="" disabled>
              Select a property type
            </option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.propertyType && (
            <p id={errorId("propertyType")} role="alert" className="mt-2 text-xs text-error">
              {errors.propertyType}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor={fieldId("service")}>
          Service interested in
        </label>
        <select
          id={fieldId("service")}
          name="service"
          className="field"
          defaultValue={NOT_SURE_SERVICE}
        >
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
          <option value={NOT_SURE_SERVICE}>Not sure yet</option>
        </select>
      </div>

      <div>
        <label className="field-label" htmlFor={fieldId("message")}>
          Project details *
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          required
          className="field resize-none"
          placeholder="The space, its size, what you would like to change, and your timeline if you have one."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
        />
        {errors.message && (
          <p id={errorId("message")} role="alert" className="mt-2 text-xs text-error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from users, irresistible to bots. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={fieldId("company")}>Company</label>
        <input id={fieldId("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!online || status === "submitting"}
          aria-busy={status === "submitting"}
        >
          <span>
            {status === "submitting" ? "Sending…" : "Send Enquiry"}
            <ArrowRight className="h-4 w-4" />
          </span>
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-charcoal/55">
          {site.responseExpectation && `${site.responseExpectation} `}
          We treat your details with care — see our privacy policy.
        </p>
      </div>

      <div role="status" aria-live="polite" className="min-h-0">
        {!online && (
          <div
            role="alert"
            className="mb-4 border border-error/35 bg-error/5 p-5 text-sm text-charcoal/80"
          >
            <p>{OFFLINE_MESSAGE}</p>
          </div>
        )}

        {status === "error" && failure && (
          <div
            role="alert"
            className="border border-error/35 bg-error/5 p-5 text-sm text-charcoal/80"
          >
            <p>{failure.message}</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {failure.retryable && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="link-underline inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em]"
                >
                  <ArrowRight className="h-4 w-4" />
                  Try again
                </button>
              )}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-charcoal/70">
              You can also visit us at {site.address.full}.{" "}
              <a
                href={site.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                Get directions
              </a>
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
