import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock } from "@/components/DocPage";

export const Route = createFileRoute("/docs/architecture")({
  component: ArchitecturePage,
});

function ArchitecturePage() {
  return (
    <DocPage
      title="Architecture"
      description="Project structure, storage layout, and development guide."
    >
      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Storage Structure
      </h2>
      <CodeBlock title="Storage layout">
        {`shared-directory/\n├── buckets/              # API-managed storage\n│   ├── my-bucket/\n│   │   ├── images/\n│   │   │   └── photo.jpg\n│   │   └── data.json\n│   └── backups/\n│       └── db.sql\n├── .beamdrop/            # Logs\n│   └── beamdrop.log      # Structured JSON log file\n├── .beamdrop_data/       # Internal database\n└── .beamdrop_trash/      # Deleted files (recoverable)`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Project Structure
      </h2>
      <CodeBlock title="Source layout">
        {`beamdrop/\n├── cmd/beam/           # CLI entry point\n├── beam/server/        # HTTP server and handlers\n├── config/             # Configuration\n├── pkg/\n│   ├── auth/           # Authentication\n│   ├── db/             # Database and models\n│   ├── errors/         # Structured error types\n│   ├── middleware/      # CORS, security headers, rate limiting\n│   ├── storage/        # Bucket/object storage\n│   ├── crypto/         # Signature utilities\n│   ├── logger/         # Dual-output structured logging\n│   └── ...\n├── static/frontend/    # React frontend\n└── docs/               # Documentation`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Development
      </h2>
      <h3 className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Prerequisites
      </h3>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Go 1.21+</li>
        <li>Node.js 18+ (for frontend development)</li>
        <li>Make</li>
      </ul>

      <h3 className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Building
      </h3>
      <CodeBlock title="Build">
        {`# Build everything\nmake build\n\n# Build backend only\ngo build -o beamdrop ./cmd/beam\n\n# Build frontend\ncd static/frontend && bun install && bun run build`}
      </CodeBlock>

      <h3 className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Running in Development
      </h3>
      <CodeBlock title="Dev">
        {`# Backend with hot reload\nmake dev\n\n# Frontend dev server\ncd static/frontend && bun run dev`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        License
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        GNU Affero General Public License v3.0
      </p>
    </DocPage>
  );
}
