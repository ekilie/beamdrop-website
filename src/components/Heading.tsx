import { Link2 } from "lucide-react";
import { ReactNode } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function Heading({
  as: Tag,
  children,
  className = "",
}: {
  as: "h2" | "h3" | "h4";
  children: ReactNode;
  className?: string;
}) {
  const text = typeof children === "string" ? children : "";
  const id = slugify(text);

  return (
    <Tag id={id} className={`group relative scroll-mt-20 ${className}`}>
      <a
        href={`#${id}`}
        className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
        aria-label={`Link to ${text}`}
      >
        <Link2 className="w-4 h-4" />
      </a>
      {children}
    </Tag>
  );
}
