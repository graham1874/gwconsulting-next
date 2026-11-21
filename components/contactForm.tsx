"use client";

import { useActionState } from "react";
import { sendMessage, type FormState } from "@/app/contact/actions";

const initialState: FormState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);

  const field =
    "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-zinc-50 focus:outline-none";

  return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input id="name" name="name" type="text" required className={field} />
            </div>

            <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input id="email" name="email" type="email" required className={field} />
            </div>

            <div>
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea id="message" name="message" rows={6} required className={field} />
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