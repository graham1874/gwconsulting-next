// app/page/[slug]/page.tsx
import { notFound } from "next/navigation";
import { wpQuery } from "@/lib/wp";

export async function generateStaticParams() {
  const data = await wpQuery(`
    query {
      pages(first: 100) {
        nodes { slug }
      }
    }
  `);

  return (data?.pages?.nodes ?? []).map((page: { slug: string }) => ({
    slug: page.slug,
  }));
}

async function getPage(slug: string) {
  const data = await wpQuery(
    `
    query PageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
      }
    }
  `,
    { slug }
  );
  return data?.page ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  return { title: page?.title ?? "Page not found" };
}

export default async function WpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
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