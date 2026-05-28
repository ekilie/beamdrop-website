import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";

export const Route = createFileRoute("/docs/architecture")({
  component: ArchitecturePage,
});

function ArchitecturePage() {
  return (
    <DocPage
      title="Architecture"
      description="Project structure, storage layout, API endpoint summary, and development guide."
    >
      {/* Storage Structure */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Storage Structure
      </Heading>
      <CodeBlock title="Storage layout" language="markup">
        {`shared-directory/\n├── buckets/              # S3-compatible bucket storage\n│   ├── my-bucket/\n│   │   ├── images/\n│   │   │   └── photo.jpg\n│   │   └── data.json\n│   └── backups/\n│       └── db.sql\n├── .beamdrop/            # Logs\n│   └── beamdrop.log      # Structured JSON log file\n├── .beamdrop_data/       # Internal data\n│   └── beamdrop.db       # SQLite database (API keys, shares, stars)\n└── .beamdrop_trash/      # Soft-deleted files (recoverable)`}
      </CodeBlock>

      {/* API Endpoint Summary */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        API Endpoint Summary
      </Heading>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        File Management
      </Heading>
      <DocTable
        headers={["Method", "Endpoint", "Description"]}
        rows={[
          ["GET", "/files?path=", "List files in directory"],
          ["POST", "/upload", "Upload file (multipart, 100 MB max)"],
          ["GET", "/download?file=", "Download file"],
          ["POST", "/mkdir", "Create directory"],
          ["POST", "/move", "Move file/folder"],
          ["POST", "/copy", "Copy file/folder"],
          ["POST", "/rename", "Rename file/folder"],
          ["POST", "/trash", "Move to trash (soft delete)"],
          ["POST", "/write", "Create/overwrite file (JSON body)"],
          ["GET", "/search?q=&path=", "Search files"],
          ["POST", "/star", "Toggle star on a file"],
          ["GET", "/starred", "Get starred files"],
        ]}
      />

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        S3-Compatible API
      </Heading>
      <DocTable
        headers={["Method", "Endpoint", "Description"]}
        rows={[
          ["GET", "/api/v1/buckets", "List all buckets"],
          ["PUT", "/api/v1/buckets/{bucket}", "Create bucket"],
          ["HEAD", "/api/v1/buckets/{bucket}", "Check bucket exists"],
          ["GET", "/api/v1/buckets/{bucket}", "Get bucket info / list objects"],
          ["DELETE", "/api/v1/buckets/{bucket}", "Delete empty bucket"],
          ["PUT", "/api/v1/buckets/{b}/{key}", "Upload object (raw body)"],
          ["POST", "/api/v1/buckets/{b}/{key}", "Upload object (multipart)"],
          ["GET", "/api/v1/buckets/{b}/{key}", "Download object"],
          ["HEAD", "/api/v1/buckets/{b}/{key}", "Get object metadata"],
          ["DELETE", "/api/v1/buckets/{b}/{key}", "Delete object"],
        ]}
      />

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Auth, Keys & Shares
      </Heading>
      <DocTable
        headers={["Method", "Endpoint", "Description"]}
        rows={[
          ["GET", "/auth/status", "Check auth status"],
          ["POST", "/auth/login", "Password login (returns JWT)"],
          ["POST", "/auth/logout", "Logout (clear session)"],
          ["POST", "/api/v1/keys", "Create API key"],
          ["GET", "/api/v1/keys", "List API keys"],
          ["DELETE", "/api/v1/keys?accessKeyId=", "Delete API key"],
          ["POST", "/api/shares", "Create shareable link"],
          ["GET", "/api/shares/list", "List all links"],
          ["DELETE", "/api/shares/delete?token=", "Delete link"],
          ["GET/POST", "/api/shares/access/{token}", "Access shared content"],
        ]}
      />

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Health & Monitoring
      </Heading>
      <DocTable
        headers={["Method", "Endpoint", "Description"]}
        rows={[
          ["GET", "/health", "Full health status"],
          ["GET", "/health/live", "Liveness probe"],
          ["GET", "/health/ready", "Readiness probe"],
          ["GET", "/health/startup", "Startup probe"],
          ["GET", "/ready", "Legacy readiness"],
          ["GET", "/stats", "Server statistics"],
          ["WS", "/ws/stats", "Real-time stats stream"],
          ["GET", "/metrics", "Prometheus metrics"],
          ["GET", "/api/logs", "Query structured logs"],
        ]}
      />

      {/* Project Structure */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Project Structure
      </Heading>
      <CodeBlock title="Source layout" language="markup">
        {`beamdrop/\n├── cmd/beam/           # CLI entry point\n├── beam/server/        # HTTP server and handlers\n├── config/             # Configuration\n├── pkg/\n│   ├── auth/           # Authentication (JWT + API keys)\n│   ├── db/             # SQLite database and models\n│   ├── errors/         # Structured error types\n│   ├── middleware/      # CORS, security headers, rate limiting\n│   ├── storage/        # Bucket/object storage engine\n│   ├── crypto/         # HMAC signature utilities\n│   ├── logger/         # Dual-output structured logging\n│   └── ...\n├── static/frontend/    # React frontend (embedded)\n└── docs/               # Documentation`}
      </CodeBlock>

      {/* Development */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Development
      </Heading>
      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Prerequisites
      </Heading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Go 1.21+</li>
        <li>Node.js 18+ (for frontend development)</li>
        <li>Make</li>
      </ul>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Building
      </Heading>
      <CodeBlock title="Build">
        {`# Build everything\nmake build\n\n# Build backend only\ngo build -o beamdrop ./cmd/beam\n\n# Build frontend\ncd static/frontend && bun install && bun run build`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Running in Development
      </Heading>
      <CodeBlock title="Dev">
        {`# Backend with hot reload\nmake dev\n\n# Frontend dev server\ncd static/frontend && bun run dev`}
      </CodeBlock>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        License
      </Heading>
      <p className="text-muted-foreground leading-relaxed">
        GNU Affero General Public License v3.0
      </p>
    </DocPage>
  );
}
