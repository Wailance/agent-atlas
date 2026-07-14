import { CatalogClient } from "@/components/CatalogClient";
import { tools } from "@/lib/tools";

export default function HomePage() {
  return <CatalogClient allTools={tools} />;
}
