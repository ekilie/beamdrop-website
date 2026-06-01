import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSeo } from "@/hooks/use-seo";
import { Copy, Check, ExternalLink } from "lucide-react";

const RAW_URL =
  "https://raw.githubusercontent.com/ekilie/beamdrop/main/docs/llms-full.txt";

export const Route = createFileRoute("/llms-full-txt")({
  component: LlmsFullTxtPage,
});

function LlmsFullTxtPage() {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useSeo({
    title: "llms-full.txt — Beamdrop",
    description:
      "Complete API reference for LLMs — all endpoints with request/response schemas, Go SDK, MCP tools, and more.",
    path: "/llms-full-txt",
  });

  useEffect(() => {
    fetch(RAW_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.text();
      })
      .then(setContent)
      .catch((e) => setError(e.message));
  }, []);

  const copy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-mono uppercase tracking-tight">
              llms-full.txt
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Complete API reference for LLMs — all endpoints, schemas, SDK
              examples, and MCP tools
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copy}
              disabled={!content}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
            <a
              href={RAW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Raw
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
          {error && (
            <div className="p-6 text-red-500 font-mono text-sm">
              Error loading llms-full.txt: {error}
            </div>
          )}
          {!content && !error && (
            <div className="p-6 text-muted-foreground font-mono text-sm animate-pulse">
              Loading llms-full.txt...
            </div>
          )}
          {content && (
            <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap break-words text-foreground/90">
              {content}
            </pre>
          )}
        </div>

        {/* Links */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-mono">
          <a
            href="/llms-txt"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            View concise version (llms.txt)
          </a>
          <span className="text-border">|</span>
          <a
            href="/docs/ai-integration"
            className="text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            AI & Agent Integration docs
          </a>
        </div>
      </div>
    </div>
  );
}
