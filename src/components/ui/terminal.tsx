"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

// ---------------------------------------------------------------------------
// Shared chrome: the mac-style window header with traffic-light dots
// ---------------------------------------------------------------------------
function TerminalChrome({ title }: { title?: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-t-xl px-4 py-3"
      style={{ background: "#2d2d2d" }}
      aria-hidden="true"
    >
      {/* Traffic-light dots */}
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{ background: "#ff5f57" }}
      />
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{ background: "#febc2e" }}
      />
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{ background: "#28c840" }}
      />
      {title && (
        <span
          className="ml-auto mr-auto text-xs"
          style={{ color: "#8a8a8a", fontFamily: "inherit" }}
        >
          {title}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Terminal — animated typing for shell commands
// ---------------------------------------------------------------------------
export interface TerminalProps {
  commands: string[];
  outputs?: Record<number, string[]>;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  className?: string;
  title?: string;
}

interface LineEntry {
  type: "command" | "output";
  text: string;
}

export function Terminal({
  commands,
  outputs = {},
  typingSpeed = 45,
  delayBetweenCommands = 1000,
  className = "",
  title = "bash",
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LineEntry[]>([]);
  const [cursor, setCursor] = useState(true);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // Cursor blink
  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, [done]);

  // Start when scrolled into view
  useEffect(() => {
    if (prefersReducedMotion) {
      // Render everything immediately
      const all: LineEntry[] = [];
      commands.forEach((cmd, i) => {
        all.push({ type: "command", text: cmd });
        (outputs[i] ?? []).forEach((o) => all.push({ type: "output", text: o }));
      });
      setLines(all);
      setDone(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  // Animation sequence
  const runAnimation = useCallback(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function delay(ms: number) {
      return new Promise<void>((resolve) => {
        const t = setTimeout(() => {
          if (!cancelled) resolve();
        }, ms);
        timers.push(t);
      });
    }

    async function animate() {
      for (let ci = 0; ci < commands.length; ci++) {
        const cmd = commands[ci];
        // Type char-by-char
        for (let ch = 1; ch <= cmd.length; ch++) {
          if (cancelled) return;
          setLines((prev) => {
            // Replace or append current command line
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0 && next[lastIdx].type === "command") {
              next[lastIdx] = { type: "command", text: cmd.slice(0, ch) };
            } else {
              next.push({ type: "command", text: cmd.slice(0, ch) });
            }
            return next;
          });
          await delay(typingSpeed);
        }
        // After command done: show outputs
        const cmdOutputs = outputs[ci] ?? [];
        for (const outLine of cmdOutputs) {
          if (cancelled) return;
          setLines((prev) => [...prev, { type: "output", text: outLine }]);
          await delay(30);
        }
        // Wait before next command
        if (ci < commands.length - 1) {
          await delay(delayBetweenCommands);
        }
      }
      setDone(true);
    }

    animate();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [commands, outputs, typingSpeed, delayBetweenCommands]);

  useEffect(() => {
    if (!started || prefersReducedMotion) return;
    const cleanup = runAnimation();
    return cleanup;
  }, [started, prefersReducedMotion, runAnimation]);

  return (
    <div
      ref={containerRef}
      className={`my-6 overflow-hidden rounded-xl shadow-xl ${className}`}
      style={{ background: "#1e1e1e" }}
      role="img"
      aria-label={`Terminal: ${commands.join("; ")}`}
    >
      <TerminalChrome title={title} />
      <div
        className="overflow-x-auto px-5 py-4 font-mono text-sm"
        style={{ color: "#e2e2e2", minHeight: "3.5rem" }}
      >
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed whitespace-pre">
            {line.type === "command" ? (
              <>
                <span style={{ color: "#28c840" }}>$</span>
                <span style={{ color: "#8a8a8a" }}>{" "}</span>
                <span style={{ color: "#e2e2e2" }}>{line.text}</span>
                {/* Show cursor only on last command line while still typing */}
                {i === lines.length - 1 && !done && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "0.5ch",
                      background: cursor ? "#e2e2e2" : "transparent",
                      marginLeft: "1px",
                    }}
                  >
                    &nbsp;
                  </span>
                )}
              </>
            ) : (
              <span style={{ color: "#a8a8a8" }}>{line.text}</span>
            )}
          </div>
        ))}
        {/* Show blinking cursor when nothing typed yet */}
        {lines.length === 0 && !done && (
          <div className="leading-relaxed">
            <span style={{ color: "#28c840" }}>$</span>
            <span
              style={{
                display: "inline-block",
                width: "0.5ch",
                background: cursor ? "#e2e2e2" : "transparent",
                marginLeft: "4px",
              }}
            >
              &nbsp;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CodeWindow — static terminal chrome for non-shell code blocks
// ---------------------------------------------------------------------------
export interface CodeWindowProps {
  code: string;
  language?: string;
  className?: string;
  title?: string;
}

export function CodeWindow({
  code,
  language,
  className = "",
  title,
}: CodeWindowProps) {
  const displayTitle = title ?? (language ? language : "code");
  return (
    <div
      className={`my-6 overflow-hidden rounded-xl shadow-xl ${className}`}
      style={{ background: "#1e1e1e" }}
      role="img"
      aria-label={`Code block${language ? `: ${language}` : ""}`}
    >
      <TerminalChrome title={displayTitle} />
      <div className="overflow-x-auto px-5 py-4 font-mono text-sm leading-relaxed">
        <pre
          className="m-0 whitespace-pre text-sm"
          style={{ color: "#e2e2e2", background: "transparent" }}
        >
          {code}
        </pre>
      </div>
    </div>
  );
}
