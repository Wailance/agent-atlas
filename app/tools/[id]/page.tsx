import { notFound } from "next/navigation";
import Link from "next/link";
import { ToolDetailClient } from "@/components/ToolDetailClient";
import { getToolById, getSimilarTools, tools } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ id: tool.id }));
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = getToolById(id);

  if (!tool) notFound();

  const similar = getSimilarTools(tool);

  return <ToolDetailClient tool={tool} similar={similar} />;
}
