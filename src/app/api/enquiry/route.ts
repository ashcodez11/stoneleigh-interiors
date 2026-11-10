import { NextResponse } from "next/server";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

/** Minimum time (ms) a genuine visitor needs to complete the form. */
const MIN_FILL_MS = 2500;

/** Service sentinel shared with the client form for "not sure yet". */
const NOT_SURE_SERVICE = "not-sure";

const MAX_LENGTHS = {
  name: 120,
  phone: 40,
  email: 200,
  propertyType: 40,
  service: 60,
  message: 4000,
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Plausible Indian phone: ten national digits (an optional +91 or leading 0 is
 * accepted and stripped), starting 6–9. Mirrors the client-side check.
 */
function isPlausibleIndianPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  let national = digits;
  if (digits.length === 12 && digits.startsWith("91")) national = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) national = digits.slice(1);
  return /^[6-9]\d{9}$/.test(national);
}

/** The six service slugs plus the "not sure yet" sentinel. */
const SERVICE_SLUGS = new Set<string>([...services.map((s) => s.slug), NOT_SURE_SERVICE]);

/** Allowed `propertyType` values — must match the options in the client form. */
const PROPERTY_TYPES = new Set<string>([
  "apartment",
  "villa",
  "penthouse",
  "duplex",
  "under-construction",
  "not-sure",
]);

/** Derived from the site config so the forwarded source cannot drift. */
const ENQUIRY_SOURCE = `${new URL(site.url).host}/contact`;

type Enquiry = {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  service: string;
  message: string;
};

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(
  body: Record<string, unknown>,
): { enquiry: Enquiry } | { error: string; field: string } {
  const enquiry: Enquiry = {
    name: str(body.name, MAX_LENGTHS.name),
    phone: str(body.phone, MAX_LENGTHS.phone),
    email: str(body.email, MAX_LENGTHS.email),
    propertyType: str(body.propertyType, MAX_LENGTHS.propertyType),
    service: str(body.service, MAX_LENGTHS.service),
    message: str(body.message, MAX_LENGTHS.message),
  };

  if (enquiry.name.length < 2) return { error: "Please tell us your name.", field: "name" };
  if (!EMAIL.test(enquiry.email))
    return { error: "Please enter a valid email address.", field: "email" };
  if (!isPlausibleIndianPhone(enquiry.phone))
    return { error: "Please enter a valid phone number.", field: "phone" };
  if (!PROPERTY_TYPES.has(enquiry.propertyType))
    return { error: "Please select a property type.", field: "propertyType" };
  if (!SERVICE_SLUGS.has(enquiry.service))
    return { error: "Please choose a service from the list.", field: "service" };
  if (enquiry.message.length < 10)
    return { error: "Please add a little more detail about your project.", field: "message" };

  return { enquiry };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "We could not read that submission. Please try again." },
      { status: 400 },
    );
  }

  // --- Spam guards --------------------------------------------------------
  if (str(body.company, 200)) {
    return NextResponse.json(
      { ok: false, message: "That submission could not be processed." },
      { status: 422 },
    );
  }

  const elapsed = Number(body.elapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json(
      { ok: false, message: "That submission looked automated. Please try again in a moment." },
      { status: 422 },
    );
  }

  // --- Validation ---------------------------------------------------------
  const result = validate(body);
  if ("error" in result) {
    return NextResponse.json(
      { ok: false, code: "VALIDATION_ERROR", field: result.field, message: result.error },
      { status: 400 },
    );
  }
  const { enquiry } = result;

  // --- Delivery -----------------------------------------------------------
  // Set ENQUIRY_WEBHOOK_URL to a form endpoint (Formspree, a serverless
  // function, an internal API…) to start receiving enquiries. Reporting success
  // without a verified delivery channel would be misleading, so we say so.
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  if (!webhook) {
    return NextResponse.json(
      {
        ok: false,
        code: "CHANNEL_NOT_CONFIGURED",
        message:
          "The enquiry channel is not configured yet, so your message could not be delivered. Please try again shortly.",
      },
      { status: 503 },
    );
  }

  try {
    const delivery = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...enquiry,
        submittedAt: new Date().toISOString(),
        source: ENQUIRY_SOURCE,
      }),
    });

    if (!delivery.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: "Your enquiry could not be delivered just now. Please try again shortly.",
        },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Your enquiry could not be delivered just now. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
