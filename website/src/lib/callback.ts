import { normaliseIndianMobile } from "./phone";

// Checks a call-back request from the footer form. Ready for a server endpoint to use;
// the GitHub Pages preview has no server, so nothing calls this yet.
//
// To connect call-backs on a server host, add src/app/api/callback/route.ts:
//
//   import { checkCallbackRequest } from "@/lib/callback";
//   export async function POST(request: Request) {
//     const result = checkCallbackRequest(await request.json().catch(() => null));
//     if (!result.ok) return Response.json(result, { status: result.status });
//     // Store or forward result.phone here (Sanity, CRM, email).
//     return Response.json({ ok: true });
//   }
//
// then build with NEXT_PUBLIC_CALLBACK_URL=/api/callback.

type Result = { ok: true; phone: string | null } | { ok: false; status: number; error: string };

export function checkCallbackRequest(body: unknown): Result {
  if (!body || typeof body !== "object" || typeof (body as { phone?: unknown }).phone !== "string") {
    return { ok: false, status: 400, error: "Missing phone number." };
  }
  const { phone, company } = body as { phone: string; company?: unknown };

  // Honeypot: real visitors never see or fill this field. Accept and ignore.
  if (company) return { ok: true, phone: null };

  const digits = normaliseIndianMobile(phone);
  if (!digits) return { ok: false, status: 422, error: "Enter a 10-digit mobile number." };
  return { ok: true, phone: digits };
}
