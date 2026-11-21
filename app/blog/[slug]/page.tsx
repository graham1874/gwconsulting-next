// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { wpQuery } from "@/lib/wp";

type Post = {
  title: string;
  content: string;
  date: string;
  author?: { node: { name: string } };
  featuredImage?: { node: { sourceUrl: string; altText: string } };
};

// Pre-build a page for every post at build time
export async function generateStaticParams() {
  const data = await wpQuery(`
    query {
      posts(first: 100) {
        nodes { slug }
      }
    }
  `);
  return data.posts.nodes.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

async function getPost(slug: string): Promise<Post | null> {
  const data = await wpQuery(
    `
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        content
        date
        author { node { name } }
        featuredImage { node { sourceUrl altText } }
      }
    }
  `,
    { slug }
  );
  return data?.post ?? null;
}

// Sets the browser tab title for each post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post ? post.title : "Post not found" };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Link href="/blog" className="text-sm underline">
        ← Back to blog
      </Link>

      <h1 className="mt-6 text-4xl font-bold">{post.title}</h1>

      <p className="mt-2 text-sm text-gray-300">
        {date}
        {post.author && ` · ${post.author.node.name}`}
      </p>

      {post.featuredImage && (
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
          width={800}
          height={450}
          className="mt-8 w-full rounded-lg"
        />
      )}

      <article
        className="mt-8 space-y-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}