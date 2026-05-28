import { ReactNode } from "react";

export function Steps({ children }: { children: ReactNode }) {
  return <div className="relative space-y-8 ml-4 my-6">{children}</div>;
}

export function Step({
  label,
  title,
  children,
}: {
  label: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative pl-8 pb-2">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      {/* Badge */}
      <div className="absolute left-0 -translate-x-1/2 w-7 h-7 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
        <span className="font-mono text-xs font-bold text-primary">
          {label}
        </span>
      </div>
      {title && (
        <h3 className="font-mono text-sm font-bold uppercase tracking-wide mb-2">
          {title}
        </h3>
      )}
      <div className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}
