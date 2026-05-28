import { AlertTriangle, Info, AlertCircle, Lightbulb } from "lucide-react";
import { ReactNode } from "react";

const variants = {
  info: {
    icon: Info,
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    iconColor: "text-blue-500",
    title: "Info",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    iconColor: "text-yellow-500",
    title: "Warning",
  },
  error: {
    icon: AlertCircle,
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    iconColor: "text-red-500",
    title: "Error",
  },
  tip: {
    icon: Lightbulb,
    border: "border-green-500/30",
    bg: "bg-green-500/5",
    iconColor: "text-green-500",
    title: "Tip",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof variants;
  title?: string;
  children: ReactNode;
}) {
  const v = variants[type];
  return (
    <div
      className={`rounded-lg border ${v.border} ${v.bg} p-4 my-6 flex gap-3`}
    >
      <v.icon className={`w-5 h-5 ${v.iconColor} shrink-0 mt-0.5`} />
      <div className="min-w-0">
        {(title || v.title) && (
          <p className="font-mono text-xs font-bold uppercase tracking-wider mb-1">
            {title || v.title}
          </p>
        )}
        <div className="text-sm text-foreground/80 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
