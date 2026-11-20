// lib/wp.ts
import "server-only";

export async function wpQuery(query: string, variables = {}) {
  const res = await fetch(process.env.WORDPRESS_API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // refresh cache every 60s
  });
  const json = await res.json();
  return json.data;
}