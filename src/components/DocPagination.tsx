import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docsNav, NavItem } from "@/config/docs-nav";

export function DocPagination() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Flatten all nav items
  const allPages: NavItem[] = docsNav.flatMap((g) => g.items);
  const currentIndex = allPages.findIndex((p) => p.to === currentPath);

  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next =
    currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="flex justify-between items-center mt-16 pt-6 border-t border-border">
      {prev ? (
        <Link
          to={prev.to}
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Previous
            </span>
            <p className="font-mono text-sm">{prev.label}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={next.to}
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-right"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Next
            </span>
            <p className="font-mono text-sm">{next.label}</p>
          </div>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
