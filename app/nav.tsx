import { wpQuery } from "../lib/wp";
import NavMenu from "./nav-menu";

export default async function Menu({ location }: { location: "PRIMARY" | "FOOTER" | "SECRET" }) {
  const data = await wpQuery(
    `
    query Menu($location: MenuLocationEnum) {
      menuItems(where: { location: $location }) {
        nodes { 
            id 
            label 
            path 
            connectedNode {
                node {
                __typename
                id
                }
            }
        }
      }
    }
  `,
    { location }
  );
  return <NavMenu items={data.menuItems.nodes} location={location} />;
}