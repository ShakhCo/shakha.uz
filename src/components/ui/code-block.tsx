"use client";

import React from "react";
import { CodeWindow } from "./terminal";

const SHELL_LANGS = new Set([
  "bash",
  "sh",
  "shell",
  "console",
  "shell-session",
  "zsh",
]);

/** Extracts language from className like "language-bash" */
function extractLang(className?: string): string | undefined {
  if (!className) return undefined;
  const m = className.match(/language-(\S+)/);
  return m ? m[1] : undefined;
}

/** Extracts text content from React children (handles string + nested elements) */
function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>;
    return extractText(el.props.children);
  }
  return String(children ?? "");
}

// ---------------------------------------------------------------------------
// CodeBlock — maps <pre> in ReactMarkdown to Terminal or CodeWindow
// ---------------------------------------------------------------------------
export function CodeBlock({
  children,
}: {
  children?: React.ReactNode;
}) {
  // The child of <pre> is a <code className="language-xxx">...</code>
  let lang: string | undefined;
  let codeText = "";

  if (React.isValidElement(children)) {
    const el = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;
    lang = extractLang(el.props.className ?? undefined);
    codeText = extractText(el.props.children);
  } else {
    codeText = extractText(children);
  }

  // Trim trailing newline that remark always appends
  codeText = codeText.replace(/\n$/, "");

  // Render all code blocks in a static terminal window so the code is always
  // visible (the animated Terminal is kept for explicit command demos only).
  const title = lang && SHELL_LANGS.has(lang) ? "bash" : undefined;
  return <CodeWindow code={codeText} language={lang} title={title} />;
}

// ---------------------------------------------------------------------------
// InlineCode — unchanged styling for single-backtick inline code
// ---------------------------------------------------------------------------
export function InlineCode({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <code className="rounded bg-[var(--color-bg-alt)] px-1 py-0.5 text-sm font-medium text-[var(--color-ink)]">
      {children}
    </code>
  );
}
