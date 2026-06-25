/**
 * BrowserFrame — wraps a screenshot in a subtle browser-window chrome
 * (traffic-light dots + a centered address pill). Keeps the screenshot bright;
 * unifies disparate screenshots into one intentional look.
 */
export function BrowserFrame({
  url,
  className = "",
  children,
}: {
  url?: string | null;
  className?: string;
  children: React.ReactNode;
}) {
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/+$/, "") : null;
  return (
    <div className={`overflow-hidden bg-white ${className}`}>
      <div className="relative flex items-center gap-1.5 border-b border-[var(--color-line)] bg-white px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        {host && (
          <span className="absolute left-1/2 max-w-[62%] -translate-x-1/2 truncate rounded-md bg-[var(--color-bg-alt)] px-3 py-0.5 text-xs text-[var(--color-muted)]">
            {host}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
