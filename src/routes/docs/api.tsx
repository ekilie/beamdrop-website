import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock } from "@/components/DocPage";

export const Route = createFileRoute("/docs/api")({
  component: ApiPage,
});

function ApiPage() {
  return (
    <DocPage
      title="API Reference"
      description="S3-compatible API with HMAC-SHA256 signed authentication."
    >
      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Creating an API Key
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Via the web interface: navigate to <strong>API Keys</strong> in the sidebar, click
        "Create New Key", and save the secret key (shown only once).
      </p>
      <CodeBlock title="Via API">
        {`curl -X POST http://localhost:8080/api/v1/keys \\\n  -H "Content-Type: application/json" \\\n  -d '{"name": "My App", "expiresIn": 2592000}'`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Authentication
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        All API requests require HMAC-SHA256 signed authentication:
      </p>
      <CodeBlock title="Generate signature">
        {`TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")\nSTRING_TO_SIGN="GET\\n/api/v1/buckets\\n\${TIMESTAMP}"\nSIGNATURE=$(echo -n "$STRING_TO_SIGN" | openssl dgst -sha256 -hmac "$SECRET_KEY" -binary | base64)\n\n# Make request\ncurl http://localhost:8080/api/v1/buckets \\\n  -H "Authorization: Bearer \${ACCESS_KEY}:\${SIGNATURE}" \\\n  -H "X-Beamdrop-Date: \${TIMESTAMP}"`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Example Operations
      </h2>
      <CodeBlock title="Create bucket">
        {`curl -X PUT http://localhost:8080/api/v1/buckets/my-bucket \\\n  -H "Authorization: Bearer \${ACCESS_KEY}:\${SIGNATURE}" \\\n  -H "X-Beamdrop-Date: \${TIMESTAMP}"`}
      </CodeBlock>

      <CodeBlock title="Upload file">
        {`curl -X PUT http://localhost:8080/api/v1/buckets/my-bucket/path/to/file.txt \\\n  -H "Authorization: Bearer \${ACCESS_KEY}:\${SIGNATURE}" \\\n  -H "X-Beamdrop-Date: \${TIMESTAMP}" \\\n  -H "Content-Type: text/plain" \\\n  -d "Hello, World!"`}
      </CodeBlock>

      <CodeBlock title="Download file">
        {`curl http://localhost:8080/api/v1/buckets/my-bucket/path/to/file.txt \\\n  -H "Authorization: Bearer \${ACCESS_KEY}:\${SIGNATURE}" \\\n  -H "X-Beamdrop-Date: \${TIMESTAMP}"`}
      </CodeBlock>

      <CodeBlock title="List objects">
        {`curl "http://localhost:8080/api/v1/buckets/my-bucket?list&prefix=path/" \\\n  -H "Authorization: Bearer \${ACCESS_KEY}:\${SIGNATURE}" \\\n  -H "X-Beamdrop-Date: \${TIMESTAMP}"`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Additional Resources
      </h2>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>
          OpenAPI Specification:{" "}
          <code className="text-primary">docs/openapi.yaml</code>
        </li>
        <li>
          Postman Collection:{" "}
          <code className="text-primary">docs/beamdrop-api.postman_collection.json</code>
        </li>
        <li>
          Postman Environment:{" "}
          <code className="text-primary">docs/beamdrop-api.postman_environment.json</code>
        </li>
        <li>
          Postman Guide:{" "}
          <code className="text-primary">docs/POSTMAN-GUIDE.md</code>
        </li>
        <li>
          API Design:{" "}
          <code className="text-primary">docs/s3-api-design.md</code>
        </li>
        <li>
          Security:{" "}
          <code className="text-primary">docs/SECURITY.md</code>
        </li>
      </ul>
    </DocPage>
  );
}
