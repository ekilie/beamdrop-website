import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";

export const Route = createFileRoute("/docs/docker")({
  component: DockerPage,
});

function DockerPage() {
  return (
    <DocPage
      title="Docker & Deployment"
      description="Run BeamDrop with Docker, Docker Compose, or behind a Caddy reverse proxy."
    >
      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Docker
      </h2>
      <CodeBlock title="Docker">
        {`# Build the image\ndocker build -t beamdrop .\n\n# Run with a persistent volume\ndocker run -d \\\n  --name beamdrop \\\n  -p 7777:7777 \\\n  -v beamdrop-data:/data \\\n  beamdrop\n\n# Run with all options\ndocker run -d \\\n  --name beamdrop \\\n  -p 7777:7777 \\\n  -v beamdrop-data:/data \\\n  -e BEAMDROP_PASSWORD="secret" \\\n  -e BEAMDROP_API_AUTH=true \\\n  -e BEAMDROP_RATE_LIMIT=100 \\\n  beamdrop`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground">
        The image is ~39 MB, runs as non-root, and includes a HEALTHCHECK against{" "}
        <code className="text-primary">/health/live</code>.
      </p>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Docker Compose (Recommended)
      </h2>
      <CodeBlock title="Docker Compose">
        {`# Start in background\ndocker compose up -d\n\n# View logs\ndocker compose logs -f beamdrop\n\n# Stop\ndocker compose down`}
      </CodeBlock>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Configure via environment variables — create a <code className="text-primary">.env</code> file:
      </p>
      <CodeBlock title=".env">
        {`BEAMDROP_PORT=7777\nBEAMDROP_PASSWORD=your-secret-password\nBEAMDROP_LOG_LEVEL=info\nBEAMDROP_RATE_LIMIT=100\nBEAMDROP_API_AUTH=true\nBEAMDROP_ALLOWED_ORIGINS=https://example.com`}
      </CodeBlock>

      <DocTable
        headers={["Variable", "Default", "Description"]}
        rows={[
          ["BEAMDROP_PORT", "7777", "Port to listen on"],
          ["BEAMDROP_PASSWORD", "(none)", "Enable password authentication"],
          ["BEAMDROP_LOG_LEVEL", "info", "Log level: debug, info, warn, error"],
          ["BEAMDROP_RATE_LIMIT", "100", "Requests/min per IP (0 = disabled)"],
          ["BEAMDROP_API_AUTH", "(off)", "Set to true to enable S3 API key auth"],
          ["BEAMDROP_ALLOWED_ORIGINS", "(none)", "Comma-separated CORS origins"],
          ["BEAMDROP_TLS_CERT", "(none)", "TLS certificate path (inside container)"],
          ["BEAMDROP_TLS_KEY", "(none)", "TLS private key path (inside container)"],
        ]}
      />

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Development Mode
      </h2>
      <CodeBlock title="Dev mode (debug logging, rate limiting off)">
        {`docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Caddy Reverse Proxy (Automatic HTTPS)
      </h2>
      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
        <li>
          Uncomment the caddy service in{" "}
          <code className="text-primary">docker-compose.yml</code>
        </li>
        <li>
          Set your domain: <code className="text-primary">export BEAMDROP_DOMAIN=files.example.com</code>
        </li>
        <li>
          Run: <code className="text-primary">docker compose up -d</code>
        </li>
      </ol>
      <p className="text-sm text-muted-foreground mt-3">
        Data is persisted in <code className="text-primary">./data/</code> on the host.
      </p>
    </DocPage>
  );
}
