import { normaliseIndianMobile } from "@/lib/phone";

// Call-back requests from the footer.
// TODO: placeholder. It checks the number and replies, but doesn't store or send it
// anywhere yet. Connect it to the forms backend (Sanity or a CRM) before launch.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.phone !== "string") {
    return Response.json({ ok: false, error: "Missing phone number." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (body.company) return Response.json({ ok: true });

  const phone = normaliseIndianMobile(body.phone);
  if (!phone) {
    return Response.json({ ok: false, error: "Enter a 10-digit mobile number." }, { status: 422 });
  }

  return Response.json({ ok: true });
}
