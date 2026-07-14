"use client";

import { useState } from "react";
import { getGithubOwnerAvatarUrl, getToolInitials } from "@/lib/repo-icon";
import { getGroupAccent, getToolPrimaryGroup } from "@/lib/ui-theme";
import type { Tool } from "@/lib/types";

const SIZES = {
  sm: { box: "h-8 w-8", text: "text-[10px]", px: 64 },
  md: { box: "h-10 w-10", text: "text-xs", px: 80 },
  lg: { box: "h-14 w-14", text: "text-sm", px: 112 },
} as const;

type ToolIconProps = {
  tool: Tool;
  size?: keyof typeof SIZES;
};

export function ToolIcon({ tool, size = "md" }: ToolIconProps) {
  const [failed, setFailed] = useState(false);
  const dims = SIZES[size];
  const group = getToolPrimaryGroup(tool);
  const accent = getGroupAccent(group);

  if (failed) {
    return (
      <span
        aria-hidden
        className={`${dims.box} shrink-0 rounded-lg border flex items-center justify-center font-semibold ${dims.text} ${accent.sectionBadge}`}
      >
        {getToolInitials(tool.name)}
      </span>
    );
  }

  return (
    <img
      src={getGithubOwnerAvatarUrl(tool.repo, dims.px)}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${dims.box} shrink-0 rounded-lg bg-zinc-800 object-cover ring-1 ring-zinc-700/80`}
    />
  );
}
