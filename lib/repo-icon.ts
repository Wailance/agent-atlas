export function getRepoOwner(repo: string): string {
  return repo.split("/")[0]?.trim() || repo;
}

export function getGithubOwnerAvatarUrl(repo: string, size = 64): string {
  const owner = getRepoOwner(repo);
  return `https://github.com/${owner}.png?size=${size}`;
}

export function getToolInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
