type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className = "h-9 w-9" }: SiteLogoProps) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-lg border border-zinc-700/80 bg-zinc-900 ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="h-[62%] w-[62%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="6"
          width="10"
          height="10"
          rx="2"
          className="fill-teal-500/90"
        />
        <rect
          x="17"
          y="6"
          width="10"
          height="10"
          rx="2"
          className="fill-zinc-600"
        />
        <rect
          x="5"
          y="18"
          width="10"
          height="10"
          rx="2"
          className="fill-zinc-600"
        />
        <rect
          x="17"
          y="18"
          width="10"
          height="10"
          rx="2"
          className="fill-violet-500/80"
        />
      </svg>
    </span>
  );
}
