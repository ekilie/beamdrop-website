import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";

export const Route = createFileRoute("/docs/monitoring")({
    component: MonitoringPage,
});

function MonitoringPage() {
    return (
        <DocPage
            title="Monitoring"
            description="Prometheus metrics, Grafana dashboard, and Kubernetes-compatible health probes."
        >
            <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
                Health Probes
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
                Kubernetes-compatible health endpoints with component-level status:
            </p>
            <DocTable
                headers={["Endpoint", "Description"]}
                rows={[
                    ["/health/live", "Liveness probe — is the process alive?"],
                    ["/health/ready", "Readiness probe — is the server ready to accept traffic?"],
                    ["/health/startup", "Startup probe — has the server finished initializing?"],
                ]}
            />

            <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
                Prometheus Metrics
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
                BeamDrop exposes a <code className="text-primary">/metrics</code> endpoint in Prometheus text format.
                Add it as a scrape target:
            </p>
            <CodeBlock title="prometheus.yml">
                {`scrape_configs:\n  - job_name: beamdrop\n    static_configs:\n      - targets: ["localhost:7777"]`}
            </CodeBlock>

            <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
                Exported Metrics
            </h2>
            <DocTable
                headers={["Metric", "Type", "Description"]}
                rows={[
                    ["beamdrop_requests_total", "counter", "HTTP requests by method, path, status"],
                    ["beamdrop_request_duration_seconds", "histogram", "Request latency (p50/p95/p99)"],
                    ["beamdrop_auth_failures_total", "counter", "Auth failures by reason"],
                    ["beamdrop_uploads_total", "counter", "Completed uploads"],
                    ["beamdrop_downloads_total", "counter", "Completed downloads"],
                    ["beamdrop_upload_size_bytes", "histogram", "Upload file sizes"],
                    ["beamdrop_storage_bytes", "gauge", "Bytes used by stored files"],
                    ["beamdrop_objects_total", "gauge", "Number of stored files"],
                    ["beamdrop_active_connections", "gauge", "In-flight HTTP requests"],
                    ["beamdrop_storage_free_bytes", "gauge", "Free disk space"],
                    ["beamdrop_storage_total_bytes", "gauge", "Total disk capacity"],
                    ["beamdrop_goroutines_count", "gauge", "Go goroutine count"],
                ]}
            />

            <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
                Grafana Dashboard
            </h2>
            <p className="text-muted-foreground leading-relaxed">
                A pre-built Grafana dashboard is available at{" "}
                <code className="text-primary">docs/grafana-dashboard.json</code>. Import it via{" "}
                <strong>Dashboards &gt; Import</strong> in Grafana.
            </p>
        </DocPage>
    );
}
