"use client";

import React from "react";
import { Terminal, CodeWindow } from "./terminal";

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

  if (lang && SHELL_LANGS.has(lang)) {
    // Split into non-empty lines as separate commands
    const commands = codeText
      .split("\n")
      .filter((l) => l.trim().length > 0);
    return <Terminal commands={commands} title="bash" />;
  }

  return <CodeWindow code={codeText} language={lang} />;
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
