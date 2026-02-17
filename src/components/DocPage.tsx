import { useState, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Copy, Check, ChevronRight } from "lucide-react";

export const CodeBlock = ({ children, title }: { children: string; title?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-border bg-background/80 my-4">
      {title && (
        <div className="px-4 py-2 border-b border-border bg-muted/50 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{title}</span>
          <button onClick={copy} className="text-muted-foreground hover:text-foreground transition-colors">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm font-mono text-foreground/90 scrollbar-thin">
        <code>{children}</code>
      </pre>
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

const sidebarLinks = [
  { to: "/docs", label: "Overview" },
  { to: "/docs/installation", label: "Installation" },
  { to: "/docs/quickstart", label: "Quick Start" },
  { to: "/docs/configuration", label: "Configuration" },
  { to: "/docs/api", label: "API Reference" },
  { to: "/docs/shares", label: "Shareable Links" },
  { to: "/docs/docker", label: "Docker & Deployment" },
  { to: "/docs/monitoring", label: "Monitoring" },
  { to: "/docs/architecture", label: "Architecture" },
];

export function DocPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <nav className="sticky top-20 space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground px-3 mb-3 block">
              Documentation
            </span>
            {sidebarLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors [&.active]:bg-primary/10 [&.active]:text-primary"
                activeProps={{ className: 'active bg-primary/10 text-primary' }}
                activeOptions={{ exact: true }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <article className="flex-1 min-w-0 max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground mb-6">
            <Link to="/docs" className="hover:text-foreground transition-colors">
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
        </article>
      </div>
    </div>
  );
}
