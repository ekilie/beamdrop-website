import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";

export const Route = createFileRoute("/docs/configuration")({
    component: ConfigurationPage,
});

function ConfigurationPage() {
    return (
        <DocPage
            title="Configuration"
            description="All CLI flags and environment variables for configuring BeamDrop."
        >
            <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
                Command Line Flags
            </h2>
            <DocTable
                headers={["Flag", "Description", "Default"]}
                rows={[
                    ["-dir", "Directory to share", "Current directory"],
                    ["-port", "Server port", "Auto-detect"],
                    ["-p", "Password for web authentication", "None"],
                    ["-api-auth", "Enable API key authentication", "false"],
                    ["-tls-cert", "Path to TLS certificate", "None"],
                    ["-tls-key", "Path to TLS private key", "None"],
                    ["-allowed-origins", "CORS allowed origins (comma-separated)", "None"],
                    ["-log-level", "Log level: debug, info, warn, error", "info"],
                    ["-v", "Show version", "-"],
                    ["-h", "Show help", "-"],
                ]}
            />

            <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
                Environment Variables (Docker)
            </h2>
            <DocTable
                headers={["Variable", "Default", "Description"]}
                rows={[
                    ["BEAMDROP_PORT", "7777", "Port to listen on"],
                    ["BEAMDROP_PASSWORD", "(none)", "Enable password authentication"],
                    ["BEAMDROP_LOG_LEVEL", "info", "Log level: debug, info, warn, error"],
                    ["BEAMDROP_RATE_LIMIT", "100", "Requests/min per IP (0 = disabled)"],
                    ["BEAMDROP_API_AUTH", "(off)", "Set to true to enable S3 API key auth"],
                    ["BEAMDROP_ALLOWED_ORIGINS", "(none)", "Comma-separated CORS origins"],
                    ["BEAMDROP_TLS_CERT", "(none)", "Path to TLS certificate (inside container)"],
                    ["BEAMDROP_TLS_KEY", "(none)", "Path to TLS private key (inside container)"],
                ]}
            />

            <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
                Security Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>HTTPS/TLS support for encrypted connections</li>
                <li>Configurable CORS with strict defaults (disabled by default)</li>
                <li>Security headers (HSTS, CSP, X-Frame-Options, etc.)</li>
                <li>HTTP method restrictions on all endpoints</li>
                <li>Per-IP rate limiting with tiered enforcement (general, auth, upload)</li>
            </ul>

            <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
                Structured Logging
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Colored, human-readable terminal output</li>
                <li>
                    Structured JSON log file at{" "}
                    <code className="text-primary">&lt;dir&gt;/.beamdrop/beamdrop.log</code>
                </li>
                <li>Configurable log level via <code className="text-primary">-log-level</code> flag</li>
            </ul>
        </DocPage>
    );
}
