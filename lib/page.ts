// lib/pages.ts
import { wpQuery } from "./wp";

export async function getPageByUri(uri: string) {
  const data = await wpQuery(
    `
    query PageByUri($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Page {
          title
          content
        }
      }
    }
  `,
    { uri }
  );
  const node = data?.nodeByUri;
  return node?.content !== undefined ? node : null;
}