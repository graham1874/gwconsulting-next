// app/contact/page.tsx
import ContactForm from "@/components/contactForm";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-4xl font-bold">Contact</h1>
        <article className="mt-8 space-y-4 leading-relaxed">
            <p className="wp-block-paragraph">
                Congratulations! You've reached the part of the website where we pretend contact forms aren't just glorified email clients.
            </p>
            <p className="wp-block-paragraph">
                Whether you've got a project you'd like to discuss, you're looking for some career advice, you want to chat about engineering leadership, AI, football, screenwriting, or you just think I've got something spectacularly wrong in one of my blog posts, I'd love to hear from you.
            </p>
            <p className="wp-block-paragraph">
                Fill out the form below and I'll get back to you as soon as I can. Unless Hearts have somehow won the league, in which case I may need a day or two to recover.
            </p>
            <p className="wp-block-paragraph">
                Looking forward to hearing from you.
            </p>
            <hr className="wp-block-separator has-alpha-channel-opacity"></hr>
        </article>
        <ContactForm />
    </main>
  );
}