import { EmailTemplate } from "../../_components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "File Sharing App <onboarding@resend.dev>";

export async function POST(req) {
  const response = await req.json();

  if (!response.emailToSend) {
    return Response.json(
      { error: "No email address provided" },
      { status: 400 },
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
      // Always return a friendly message — domain not verified yet
      return Response.json(
        { error: "couldn't find email. copy the link instead" },
        { status: 500 },
      );
    }

    return Response.json(data);
  } catch (err) {
    console.error("Caught error:", err);
    return Response.json(
      { error: "couldn't find email. copy the link instead" },
      { status: 500 },
    );
  }
}
