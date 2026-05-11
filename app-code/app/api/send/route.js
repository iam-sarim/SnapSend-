import { EmailTemplate } from "../../_components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// NOTE: Resend's free plan with "onboarding@resend.dev" only allows sending to
// your own Resend-registered email. To send to ANY email address, you must:
//   1. Verify your own domain at resend.com/domains (e.g. sarimawan.com)
//   2. Add RESEND_FROM_EMAIL=noreply@sarimawan.com to your .env.local
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "File Sharing App <onboarding@resend.dev>";

export async function POST(req) {
  const response = await req.json();

  if (!response.emailToSend) {
    return Response.json(
      { error: "No email address provided" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [response.emailToSend],
      subject: `${response.userName || "Someone"} shared a file with you`,
      react: EmailTemplate({ response }),
    });

    if (error) {
      console.error("Resend error:", error);
      const userMessage =
        error.message?.toLowerCase().includes("not allowed") ||
        error.message?.toLowerCase().includes("can only send") ||
        error.message?.toLowerCase().includes("testing")
          ? "Your Resend account is in test mode — emails can only be sent to your registered Resend email. Verify a domain at resend.com/domains to send to any address."
          : error.message || "Failed to send email.";
      return Response.json({ error: userMessage }, { status: 500 });
    }

    return Response.json(data);
  } catch (err) {
    console.error("Caught error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
