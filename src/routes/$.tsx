import { createFileRoute, Link } from "@tanstack/react-router";
import { useSeo } from "@/hooks/use-seo";
import { FileQuestion, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/$")({
  component: NotFound,
});

function NotFound() {
  useSeo({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    path: "/404",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <FileQuestion className="w-16 h-16 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold font-mono uppercase tracking-tight mb-3">
        404
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Home
        </Link>
        <Link
          to="/docs"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground font-mono text-xs uppercase tracking-wider transition-colors"
        >
          Documentation
        </Link>
      </div>
    </div>
  );
}
