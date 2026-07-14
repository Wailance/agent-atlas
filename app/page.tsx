import { CatalogClient } from "@/components/CatalogClient";
import { parseCatalogSearchParams } from "@/lib/catalog-url";
import { tools } from "@/lib/tools";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialFilters = parseCatalogSearchParams(params);

  return <CatalogClient allTools={tools} initialFilters={initialFilters} />;
}
