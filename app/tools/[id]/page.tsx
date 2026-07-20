import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolDetailClient } from "@/components/ToolDetailClient";
import {
  getToolById,
  getSimilarTools,
  getToolShortDescription,
  tools,
} from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ id: tool.id }));
}

function buildToolMetadataDescription(id: string): string {
  const tool = getToolById(id);
  if (!tool) {
    return "Каталог AI-инструментов и open-source проектов на GitHub.";
  }

  const text = getToolShortDescription(tool, "ru").replace(/\s+/g, " ").trim();
  return text.length > 155 ? `${text.slice(0, 152).trim()}...` : text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tool = getToolById(id);

  if (!tool) {
    return {};
  }

  const description = buildToolMetadataDescription(id);

  return {
    title: `${tool.name} — каталог AI-инструментов`,
    description,
    alternates: {
      canonical: `/tools/${tool.id}/`,
    },
    openGraph: {
      title: `${tool.name} — каталог AI-инструментов`,
      description,
      type: "article",
      url: `/tools/${tool.id}/`,
    },
    twitter: {
      card: "summary",
      title: `${tool.name} — каталог AI-инструментов`,
      description,
    },
  };
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
