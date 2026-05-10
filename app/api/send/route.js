import { EmailTemplate } from "../../_components/email-template";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  console.log("API KEY:", process.env.RESEND_API_KEY);
  const response = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["sarimkhan12345678910@gmail.com"],
      subject: response?.fullName + "share file with you",
      react: EmailTemplate({ response }),
    });

    console.log("Resend response:", { data, error }); // 👈 check response

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("CAUGHT ERROR:", error); // 👈 check error
    return Response.json({ error }, { status: 500 });
  }
}
