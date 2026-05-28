import * as Dialog from "@radix-ui/react-dialog";
import { Search, FileText, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import Fuse from "fuse.js";
import { docsNav } from "@/config/docs-nav";

// Build search index from nav + page descriptions
const searchItems = docsNav.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    group: group.title,
  })),
);

const fuse = new Fuse(searchItems, {
  keys: ["label", "group"],
  threshold: 0.4,
});

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query ? fuse.search(query).map((r) => r.item) : searchItems;

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    setQuery("");
    navigate({ to });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-mono text-xs"
      >
        <Search className="w-3.5 h-3.5" />
        Search...
        <kbd className="ml-2 px-1.5 py-0.5 rounded bg-muted text-[10px] border border-border">
          ⌘K
        </kbd>
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 py-3 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] border border-border font-mono">
                ESC
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </p>
              ) : (
                results.map((item) => (
                  <button
                    key={item.to}
                    onClick={() => go(item.to)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-muted/50 transition-colors group"
                  >
                    <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm truncate">{item.label}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {item.group}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
