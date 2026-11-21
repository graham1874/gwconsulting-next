// app/contact/actions.ts
"use server";

import { Resend } from "resend";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendMessage(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot: bots fill this hidden field, humans don't
  if (formData.get("website")) {
    return { status: "success", message: "Thanks, message sent!" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();

  if (!name || !email || !message || !subject) {
    return { status: "error", message: "Please fill in every field." };
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email." };
  }
  if (message.length > 5000) {
    return { status: "error", message: "Message is too long." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Website Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email,
    subject: `New message from ${name} - ${subject}`,
    text: `From: ${name} <${email}>\n\nSubject: ${subject}\n\n${message}`,
  });

  if (error) {
    console.error(error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success", message: "Thanks, message sent!" };
}