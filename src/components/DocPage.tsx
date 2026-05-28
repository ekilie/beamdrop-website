import { useState, ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check, ChevronRight, ChevronDown, Menu } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useSeo } from "@/hooks/use-seo";
import { docsNav } from "@/config/docs-nav";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Dialog from "@radix-ui/react-dialog";
import { TableOfContents } from "@/components/TableOfContents";
import { DocPagination } from "@/components/DocPagination";

export const CodeBlock = ({
  children,
  title,
  language = "bash",
}: {
  children: string;
  title?: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const [expanded, setExpanded] = useState(false);
  const lineCount = children.trim().split("\n").length;
  const isLong = lineCount > 15;
  const showHeader = title || language !== "bash";

  return (
    <div className="relative group rounded-lg overflow-hidden border border-border bg-background/80 my-4">
      {showHeader && (
        <div className="px-4 py-2 border-b border-border bg-muted/50 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            {title || language}
          </span>
          <button
            onClick={copy}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      )}
      {!showHeader && (
        <button
          onClick={copy}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground z-10"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      )}
      <div
        className={`relative ${
          !expanded && isLong ? "max-h-[360px] overflow-hidden" : ""
        }`}
      >
        <Highlight
          theme={isDark ? themes.nightOwl : themes.nightOwlLight}
          code={children.trim()}
          language={language}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre
              className="p-4 overflow-x-auto text-sm font-mono scrollbar-thin"
              style={{ background: "transparent" }}
            >
              <code>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
        {!expanded && isLong && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-2">
            <button
              onClick={() => setExpanded(true)}
              className="font-mono text-xs text-primary hover:underline"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const DocTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) => (
  <div className="overflow-x-auto rounded-lg border border-border my-6">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-muted/30">
          {headers.map((h) => (
            <th
              key={h}
              className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="font-mono text-xs">
        {rows.map((row, i) => (
          <tr
            key={i}
            className="border-b border-border/50 hover:bg-muted/20 transition-colors"
          >
            {row.map((cell, j) => (
              <td
                key={j}
                className={`px-4 py-3 ${j === 0 ? "text-primary font-bold" : "text-foreground/80"}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export function DocPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useSeo({
    title: `${title} — Docs`,
    description:
      description || `${title} documentation for BeamDrop file server.`,
    path: currentPath,
  });

  const sidebarContent = (
    <nav className="space-y-4">
      {docsNav.map((group) => {
        const isActive = group.items.some((i) => i.to === currentPath);
        return (
          <Collapsible.Root key={group.title} defaultOpen={isActive || true}>
            <Collapsible.Trigger className="flex items-center justify-between w-full px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
              {group.title}
              <ChevronDown className="w-3 h-3 transition-transform [[data-state=closed]>&]:rotate-[-90deg]" />
            </Collapsible.Trigger>
            <Collapsible.Content className="mt-1 space-y-0.5">
              {group.items.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className="block px-3 py-1.5 rounded-md font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors [&.active]:bg-primary/10 [&.active]:text-primary"
                  activeProps={{
                    className: "active bg-primary/10 text-primary",
                  }}
                  activeOptions={{ exact: true }}
                >
                  {link.label}
                </Link>
              ))}
            </Collapsible.Content>
          </Collapsible.Root>
        );
      })}
    </nav>
  );

  return (
    <div className="py-12 px-4">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden mb-4 max-w-7xl mx-auto">
        <Dialog.Root open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <Dialog.Trigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground font-mono text-xs uppercase tracking-wider">
              <Menu className="w-4 h-4" /> Menu
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />
            <Dialog.Content className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-border z-50 p-6 overflow-y-auto">
              {sidebarContent}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Sidebar (left) */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20">{sidebarContent}</div>
        </aside>

        {/* Content (center) */}
        <article className="flex-1 min-w-0 max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground mb-6">
            <Link
              to="/docs"
              className="hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-mono uppercase tracking-tight mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {description}
            </p>
          )}
          <div className="prose-doc space-y-6">{children}</div>
          <DocPagination />
        </article>

        {/* Table of Contents (right) */}
        <TableOfContents />
      </div>
    </div>
  );
}
