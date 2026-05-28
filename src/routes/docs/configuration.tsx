import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";

export const Route = createFileRoute("/docs/configuration")({
  component: ConfigurationPage,
});

function ConfigurationPage() {
  return (
    <DocPage
      title="Configuration"
      description="All CLI flags and environment variables for configuring BeamDrop."
    >
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Command Line Flags
      </Heading>
      <DocTable
        headers={["Flag", "Description", "Default"]}
        rows={[
          ["-dir", "Directory to share", ". (current)"],
          ["-port", "Server port", "Auto-detect (prefers 7777)"],
          ["-p", "Password for web authentication", "None (disabled)"],
          [
            "-api-auth",
            "Enable API key authentication for S3 API IMPORTANT",
            "false",
          ],
          ["-tls-cert", "Path to TLS certificate file", "None"],
          ["-tls-key", "Path to TLS private key file", "None"],
          [
            "-allowed-origins",
            "Comma-separated CORS origins",
            "None (CORS disabled)",
          ],
          [
            "-db-path",
            "Path to database file or directory",
            "~/.beamdrop/beamdrop.db",
          ],
          ["-rate-limit", "Requests/min per IP (0 = disabled)", "100"],
          [
            "-max-storage",
            "Maximum total storage, e.g. 500MB, 10GB, 1TB (0 = unlimited)",
            "0",
          ],
          ["-log-level", "debug, info, warn, error", "info"],
          ["-qr", "Enable QR code display", "false"],
          ["-shutdown-timeout", "Graceful shutdown timeout", "30s"],
          ["-v", "Show version", "-"],
          ["-h", "Show help", "-"],
        ]}
      />

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Environment Variables (Docker)
      </Heading>
      <DocTable
        headers={["Variable", "Default", "Description"]}
        rows={[
          ["BEAMDROP_PORT", "7777", "Server port"],
          ["BEAMDROP_PASSWORD", "(none)", "Enable password auth"],
          ["BEAMDROP_LOG_LEVEL", "info", "Log level"],
          ["BEAMDROP_RATE_LIMIT", "100", "Requests/min per IP"],
          [
            "BEAMDROP_MAX_STORAGE",
            "0",
            "Max storage, e.g. 500MB, 10GB, 1TB (0 = unlimited)",
          ],
          ["BEAMDROP_API_AUTH", "false", "Enable S3 API key auth"],
          ["BEAMDROP_QR", "false", "Enable QR code display"],
          ["BEAMDROP_ALLOWED_ORIGINS", "(none)", "CORS origins"],
          ["BEAMDROP_DB_PATH", "(none)", "Path to database file or directory"],
          ["BEAMDROP_TLS_CERT", "(none)", "TLS certificate path"],
          ["BEAMDROP_TLS_KEY", "(none)", "TLS private key path"],
        ]}
      />

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Quick Start Examples
      </Heading>
      <CodeBlock title="CLI examples">
        {`# Share current directory\nbeamdrop\n\n# Share a specific directory with password\nbeamdrop -dir /path/to/share -p mysecretpassword\n\n# Enable S3 API with auth\nbeamdrop -dir /path/to/share -api-auth\n\n# Full production setup\nbeamdrop -dir /data -p secret -api-auth -tls-cert cert.pem -tls-key key.pem -rate-limit 200`}
      </CodeBlock>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Upload Limits
      </Heading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>
          <strong>Max file size:</strong> 100 MB
        </li>
        <li>
          <strong>Allowed MIME types:</strong> Images, documents, archives,
          audio, video, code, and{" "}
          <code className="text-primary">application/octet-stream</code>
        </li>
      </ul>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Security Features
      </Heading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>HTTPS/TLS support for encrypted connections</li>
        <li>Configurable CORS with strict defaults (disabled by default)</li>
        <li>Security headers (HSTS, CSP, X-Frame-Options, etc.)</li>
        <li>HTTP method restrictions on all endpoints</li>
        <li>
          Per-IP rate limiting with tiered enforcement (general, auth, upload)
        </li>
      </ul>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Structured Logging
      </Heading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Colored, human-readable terminal output</li>
        <li>
          Structured JSON log file at{" "}
          <code className="text-primary">
            &lt;dir&gt;/.beamdrop/beamdrop.log
          </code>
        </li>
        <li>
          Configurable log level via{" "}
          <code className="text-primary">-log-level</code> flag
        </li>
      </ul>
    </DocPage>
  );
}
