import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";

export const Route = createFileRoute("/docs/monitoring")({
  component: MonitoringPage,
});

function MonitoringPage() {
  return (
    <DocPage
      title="Health & Monitoring"
      description="Kubernetes-compatible health probes, Prometheus metrics, real-time stats, WebSocket events, and structured logs."
    >
      {/* Health Endpoints */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Health Endpoints
      </Heading>
      <DocTable
        headers={["Endpoint", "Purpose", "Use Case"]}
        rows={[
          ["/health", "Full health + component status", "Monitoring dashboard"],
          ["/health/live", "Liveness probe", "Kubernetes liveness"],
          ["/health/ready", "Readiness probe", "Kubernetes readiness"],
          ["/health/startup", "Startup probe", "Kubernetes startup"],
          ["/ready", "Legacy readiness probe", "Load balancer health check"],
        ]}
      />
      <CodeBlock title="Full health response">
        {`GET /health\n\n{\n  "status": "healthy",\n  "service": "beamdrop",\n  "version": "0.0.1",\n  "timestamp": "2025-01-15T10:30:00Z",\n  "components": {\n    "process": { "status": "ok", "message": "running" },\n    "startup": { "status": "ok", "message": "initialisation complete" },\n    "database": { "status": "ok", "message": "connected", "latency": "1.23ms" },\n    "storage": { "status": "ok", "message": "writable" },\n    "runtime": { "status": "ok", "message": "goroutines: 12" }\n  }\n}`}
      </CodeBlock>

      {/* Stats */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Stats Endpoint
      </Heading>
      <CodeBlock title="GET /stats">
        {`GET /stats\n\n{\n  "downloads": 42,\n  "uploads": 15,\n  "requests": 1234,\n  "startTime": "2025-01-15T08:00:00Z"\n}`}
      </CodeBlock>

      {/* WebSocket */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Real-Time Stats (WebSocket)
      </Heading>
      <CodeBlock title="WebSocket connection">
        {`ws://localhost:7777/ws/stats\n\n# Receives updates every 60 seconds:\n{\n  "downloads": 42,\n  "requests": 1234,\n  "uploads": 15,\n  "startTime": "2025-01-15T08:00:00Z",\n  "system": {\n    "memory": { "total": 16000000000, "used": 8000000000, "percent": 50.0 },\n    "disk": { "total": 500000000000, "used": 200000000000, "percent": 40.0 },\n    "cpu": { "percent": 25.0 }\n  }\n}`}
      </CodeBlock>

      {/* Logs */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Logs Endpoint
      </Heading>
      <DocTable
        headers={["Parameter", "Type", "Default", "Description"]}
        rows={[
          ["limit", "number", "200", "Max entries to return (max 5000)"],
          ["offset", "number", "0", "Entries to skip (for pagination)"],
          ["level", "string", "(all)", "Filter by log level"],
          ["search", "string", "—", "Case-insensitive message search"],
        ]}
      />
      <CodeBlock title="GET /api/logs">
        {`GET /api/logs?limit=200&offset=0&level=error&search=upload\n\n{\n  "logs": [\n    {\n      "time": "2025-01-15T10:30:00Z",\n      "level": "INFO",\n      "msg": "File uploaded successfully",\n      "file": "photo.jpg"\n    }\n  ],\n  "total": 500,\n  "returned": 200,\n  "hasMore": true,\n  "logPath": "/data/.beamdrop/beamdrop.log"\n}`}
      </CodeBlock>

      {/* Prometheus Metrics */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Prometheus Metrics
      </Heading>
      <p className="text-sm text-muted-foreground mb-4">
        BeamDrop exposes a <code className="text-primary">/metrics</code>{" "}
        endpoint in Prometheus text format.
      </p>
      <CodeBlock title="prometheus.yml" language="yaml">
        {`scrape_configs:\n  - job_name: beamdrop\n    static_configs:\n      - targets: ["localhost:7777"]`}
      </CodeBlock>
      <DocTable
        headers={["Metric", "Type", "Description"]}
        rows={[
          [
            "beamdrop_requests_total",
            "counter",
            "HTTP requests by method, path, status",
          ],
          [
            "beamdrop_request_duration_seconds",
            "histogram",
            "Request latency (p50/p95/p99)",
          ],
          [
            "beamdrop_auth_failures_total",
            "counter",
            "Auth failures by reason",
          ],
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

      {/* Grafana */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Grafana Dashboard
      </Heading>
      <p className="text-muted-foreground leading-relaxed">
        A pre-built Grafana dashboard is available at{" "}
        <code className="text-primary">docs/grafana-dashboard.json</code>.
        Import it via <strong>Dashboards &gt; Import</strong> in Grafana.
      </p>
    </DocPage>
  );
}
