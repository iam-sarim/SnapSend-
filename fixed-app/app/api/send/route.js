import { EmailTemplate } from "../../_components/email-template";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json();

  if (!response.emailToSend) {
    return Response.json({ error: "No email address provided" }, { status: 400 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "File Sharing App <onboarding@resend.dev>",
      to: [response.emailToSend],
      subject: `${response.userName} shared a file with you`,
      react: EmailTemplate({ response }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Caught error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
