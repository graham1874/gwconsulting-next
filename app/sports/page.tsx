import { wpQuery } from "@/lib/wp";
import Blog from "@/components/blog";

export default async function BlogPage() {
  const data = await wpQuery(`
    query {
      posts(where: { categoryName: "Sports" }) {
        nodes { 
          title
          slug
          excerpt
          date
          author { node { name } }
          categories { nodes { name slug } }
          featuredImage {
            node {
              sourceUrl(size: MEDIUM_LARGE)
              altText
            }
          }
        }
      }
    }
  `);

  return (
    <Blog data={data} />
  );
}