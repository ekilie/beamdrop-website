export interface NavItem {
  to: string;
  label: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const docsNav: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { to: "/docs", label: "Overview" },
      { to: "/docs/installation", label: "Installation" },
      { to: "/docs/quickstart", label: "Quick Start" },
      { to: "/docs/configuration", label: "Configuration" },
    ],
  },
  {
    title: "Authentication",
    items: [
      { to: "/docs/authentication", label: "Authentication" },
      { to: "/docs/presigned-urls", label: "Presigned URLs" },
      { to: "/docs/shares", label: "Shareable Links" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { to: "/docs/file-api", label: "File Management API" },
      { to: "/docs/api", label: "S3-Compatible API" },
      { to: "/docs/error-codes", label: "Error Codes" },
      { to: "/docs/typescript-guide", label: "TypeScript Guide" },
    ],
  },
  {
    title: "Deployment",
    items: [
      { to: "/docs/docker", label: "Docker & Deployment" },
      { to: "/docs/monitoring", label: "Health & Monitoring" },
      { to: "/docs/architecture", label: "Architecture" },
    ],
  },
  {
    title: "AI & Agents",
    items: [
      { to: "/docs/ai-integration", label: "AI & Agent Integration" },
    ],
  },
];
