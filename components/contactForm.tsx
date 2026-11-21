"use client";

import { useActionState } from "react";
import { sendMessage, type FormState } from "@/app/contact/actions";

const initialState: FormState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);

  const field =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-zinc-50 focus:outline-none";

  return (
        <form action={formAction} className="space-y-4 pt-4">
            <div>
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input id="name" name="name" type="text" required className={`mt-1 ${field}`} />
            </div>

            <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input id="email" name="email" type="email" required className={`mt-1 ${field}`} />
            </div>

            <div>
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <div className="relative mt-1">
                    <select id="subject" name="subject" required className={`${field} appearance-none pr-10`}>
                        <option value="Coaching" selected>You want to work with me!</option>
                        <option value="Hiring">You want me to work with you.</option>
                        <option value="Coffee">Let's Organize a Coffee Chat</option>
                        <option value="Blog">You loved my blog post but have questions</option>
                        <option value="other">Something else and I'll give you more details</option>
                    </select>
                    <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </svg>
                </div>
            </div>

            <div>
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea id="message" name="message" rows={6} required className={`mt-1 ${field}`} />
            </div>

            {/* Honeypot, hidden from real users */}
            <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
            />
            <div className="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
                <div className="wp-block-button">
                    <button
                        type="submit"
                        disabled={pending}
                        className="wp-block-button__link wp-element-button"
                    >
                        {pending ? "Sending..." : "Send message"}
                    </button>
                </div>
            </div>

        {state.status !== "idle" && (
            <p
            role="status"
            className={state.status === "success" ? "text-green-700" : "text-red-700"}
            >
            {state.message}
            </p>
        )}
    </form>
  );
}