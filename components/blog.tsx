"use client";

import Link from "next/link";
import Image from "next/image";

export default function Blog({ data }: { data: any }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex mb-4">
        {data.posts.nodes.map((post: any) => (
          <article className="md:w-1/3 p-2" key={post.slug}>
            <Link className="space-x-2" href={`/blog/${post.slug}`}>
            
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    width={600}
                    height={400}
                    className="aspect-[3/2] w-full rounded-lg object-cover"
                  />
                ) : (
                  <Image
                    src="/default.png"
                    alt={post.title}
                    width={600}
                    height={400}
                    className="aspect-[3/2] w-full rounded-lg object-cover"
                  />
                )}

                <h2 className="mt-3 text-xl font-semibold group-hover:underline">
                  {post.title}
                </h2>

              <p className="mt-1 text-sm">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                {post.categories.nodes.map((node: { name: any; }) => (
                    node && ` · ${node.name}`
                  )
                )}
              </p>

              <div
                className="mt-2 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}