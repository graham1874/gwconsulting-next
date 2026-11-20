// app/page.tsx
import { notFound } from "next/navigation";
import { getPageByUri } from "@/lib/page";

export default async function Home() {
  const page = await getPageByUri("/home");
  if (!page) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <article
        className="mt-8 space-y-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  );
}