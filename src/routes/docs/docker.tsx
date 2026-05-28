import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";

export const Route = createFileRoute("/docs/docker")({
  component: DockerPage,
});

function DockerPage() {
  return (
    <DocPage
      title="Docker & Deployment"
      description="Run BeamDrop with Docker, Docker Compose, Kubernetes, or behind a Caddy reverse proxy."
    >
      {/* Docker Run */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Docker
      </Heading>
      <CodeBlock title="Docker Run">
        {`docker run -d \\\n  --name beamdrop \\\n  -p 7777:7777 \\\n  -v beamdrop-data:/data \\\n  -e BEAMDROP_PASSWORD="secret" \\\n  -e BEAMDROP_API_AUTH=true \\\n  -e BEAMDROP_RATE_LIMIT=100 \\\n  beamdrop`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground mb-6">
        The image is ~39 MB, runs as non-root, and includes a HEALTHCHECK
        against <code className="text-primary">/health/live</code>.
      </p>

      {/* Docker Compose */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Docker Compose
      </Heading>
      <CodeBlock title="docker-compose.yml" language="yaml">
        {`services:\n  beamdrop:\n    build: .\n    ports:\n      - "7777:7777"\n    volumes:\n      - ./data:/data\n    environment:\n      BEAMDROP_PORT: \${BEAMDROP_PORT:-7777}\n      BEAMDROP_PASSWORD: \${BEAMDROP_PASSWORD:-}\n      BEAMDROP_API_AUTH: \${BEAMDROP_API_AUTH:-false}\n      BEAMDROP_RATE_LIMIT: \${BEAMDROP_RATE_LIMIT:-100}\n      BEAMDROP_MAX_STORAGE: \${BEAMDROP_MAX_STORAGE:-0}\n      BEAMDROP_LOG_LEVEL: \${BEAMDROP_LOG_LEVEL:-info}\n      BEAMDROP_QR: \${BEAMDROP_QR:-false}\n      BEAMDROP_ALLOWED_ORIGINS: \${BEAMDROP_ALLOWED_ORIGINS:-}\n      BEAMDROP_DB_PATH: \${BEAMDROP_DB_PATH:-}\n      BEAMDROP_TLS_CERT: \${BEAMDROP_TLS_CERT:-}\n      BEAMDROP_TLS_KEY: \${BEAMDROP_TLS_KEY:-}\n    healthcheck:\n      test: ["CMD", "wget", "-q", "--spider", "http://localhost:7777/health/live"]\n      interval: 30s\n      timeout: 5s\n      retries: 3\n    restart: unless-stopped`}
      </CodeBlock>

      {/* Kubernetes */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Kubernetes Probes
      </Heading>
      <CodeBlock title="deployment.yaml (probes section)" language="yaml">
        {`livenessProbe:\n  httpGet:\n    path: /health/live\n    port: 7777\n  initialDelaySeconds: 5\n  periodSeconds: 10\n  failureThreshold: 3\n\nreadinessProbe:\n  httpGet:\n    path: /health/ready\n    port: 7777\n  initialDelaySeconds: 10\n  periodSeconds: 15\n  failureThreshold: 3\n\nstartupProbe:\n  httpGet:\n    path: /health/startup\n    port: 7777\n  failureThreshold: 30\n  periodSeconds: 2`}
      </CodeBlock>

      {/* Rate Limiting */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Rate Limiting
      </Heading>
      <p className="text-sm text-muted-foreground mb-3">
        When <code className="text-primary">-rate-limit N</code> is set,
        different endpoint categories get different limits:
      </p>
      <DocTable
        headers={["Category", "Limit", "Example"]}
        rows={[
          ["General", "N req/min", "All endpoints"],
          ["Auth", "N/20 req/min (min 1)", "/auth/login"],
          ["Upload", "N/10 req/min (min 1)", "/upload, S3 PUT object"],
        ]}
      />

      {/* Caddy */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Caddy Reverse Proxy
      </Heading>
      <CodeBlock title="Caddyfile" language="markup">
        {`{$BEAMDROP_DOMAIN:localhost} {\n  reverse_proxy beamdrop:7777\n}`}
      </CodeBlock>
      <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-3">
        <li>
          Uncomment the caddy service in{" "}
          <code className="text-primary">docker-compose.yml</code>
        </li>
        <li>
          Set your domain:{" "}
          <code className="text-primary">
            export BEAMDROP_DOMAIN=files.example.com
          </code>
        </li>
        <li>
          Run: <code className="text-primary">docker compose up -d</code>
        </li>
      </ol>

      {/* Prometheus */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Prometheus Scrape Config
      </Heading>
      <CodeBlock title="prometheus.yml" language="yaml">
        {`scrape_configs:\n  - job_name: beamdrop\n    static_configs:\n      - targets: ["beamdrop:7777"]\n    metrics_path: /metrics\n    scrape_interval: 15s`}
      </CodeBlock>

      {/* Environment Variables */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Environment Variables
      </Heading>
      <DocTable
        headers={["Variable", "Default", "Description"]}
        rows={[
          ["BEAMDROP_PORT", "7777", "Port to listen on"],
          ["BEAMDROP_PASSWORD", "(none)", "Enable password authentication"],
          ["BEAMDROP_LOG_LEVEL", "info", "Log level: debug, info, warn, error"],
          ["BEAMDROP_RATE_LIMIT", "100", "Requests/min per IP (0 = disabled)"],
          [
            "BEAMDROP_MAX_STORAGE",
            "0",
            "Max storage, e.g. 500MB, 10GB, 1TB (0 = unlimited)",
          ],
          [
            "BEAMDROP_API_AUTH",
            "(off)",
            "Set to true to enable S3 API key auth",
          ],
          [
            "BEAMDROP_ALLOWED_ORIGINS",
            "(none)",
            "Comma-separated CORS origins",
          ],
          ["BEAMDROP_TLS_CERT", "(none)", "TLS certificate path"],
          ["BEAMDROP_TLS_KEY", "(none)", "TLS private key path"],
          ["BEAMDROP_QR", "(off)", "Print QR code with server URL on start"],
          [
            "BEAMDROP_DB_PATH",
            "(default)",
            "Custom path for the SQLite database",
          ],
        ]}
      />

      <p className="text-sm text-muted-foreground mt-6">
        Data is persisted in <code className="text-primary">/data</code> inside
        the container. Mount a volume to retain data across restarts.
      </p>
    </DocPage>
  );
}
