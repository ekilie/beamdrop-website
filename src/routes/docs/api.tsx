import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";

export const Route = createFileRoute("/docs/api")({
  component: ApiPage,
});

function ApiPage() {
  return (
    <DocPage
      title="S3-Compatible API"
      description="Bucket/object storage with API key management and HMAC-SHA256 signed authentication."
    >
      {/* API Key Management */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        API Key Management
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        API keys are managed via{" "}
        <code className="text-primary">/api/v1/keys</code>. These endpoints use{" "}
        <strong>session auth</strong> (cookies from the web UI login), not API
        key auth.
      </p>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Create API Key
      </Heading>
      <CodeBlock title="POST /api/v1/keys">
        {`POST /api/v1/keys\nContent-Type: application/json\n\n{\n  "name": "My CI Pipeline",\n  "permissions": "read,write",\n  "bucketScope": "my-bucket",\n  "expiresIn": 2592000\n}`}
      </CodeBlock>
      <DocTable
        headers={["Field", "Type", "Required", "Description"]}
        rows={[
          ["name", "string", "Yes", "Human-readable name"],
          ["permissions", "string", "No", "Comma-separated permissions"],
          ["bucketScope", "string", "No", "Restrict key to a specific bucket"],
          ["expiresIn", "number", "No", "Expiry in seconds (null = never)"],
        ]}
      />
      <CodeBlock title="Response (201)" language="json">
        {`{\n  "id": 1,\n  "name": "My CI Pipeline",\n  "accessKeyId": "BDK_a1b2c3d4e5f67890",\n  "secretKey": "sk_1234567890abcdef1234567890abcdef12345678",\n  "permissions": "read,write",\n  "bucketScope": "my-bucket",\n  "expiresAt": "2025-02-14T10:30:00Z",\n  "createdAt": "2025-01-15T10:30:00Z",\n  "warning": "Save the secret key now. It cannot be retrieved later."\n}`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground mt-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
        <strong>Important:</strong> The{" "}
        <code className="text-primary">secretKey</code> is shown{" "}
        <strong>only once</strong>. Store it securely.
      </p>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        List API Keys
      </Heading>
      <CodeBlock title="GET /api/v1/keys">
        {`GET /api/v1/keys\n\n# Response:\n{\n  "keys": [\n    {\n      "id": 1,\n      "name": "My CI Pipeline",\n      "accessKeyId": "BDK_a1b2c3d4e5f67890",\n      "permissions": "read,write",\n      "bucketScope": "my-bucket",\n      "expiresAt": "2025-02-14T10:30:00Z",\n      "lastUsedAt": "2025-01-20T09:15:00Z",\n      "createdAt": "2025-01-15T10:30:00Z",\n      "disabled": false\n    }\n  ],\n  "count": 1\n}`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Delete API Key
      </Heading>
      <CodeBlock title="DELETE /api/v1/keys">
        {`DELETE /api/v1/keys?accessKeyId=BDK_a1b2c3d4e5f67890\n\n# Response: 204 No Content`}
      </CodeBlock>

      {/* Bucket Operations */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Bucket Operations
      </Heading>
      <p className="text-sm text-muted-foreground mb-4">
        All bucket endpoints require API key auth when{" "}
        <code className="text-primary">-api-auth</code> is enabled.
      </p>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        List Buckets
      </Heading>
      <CodeBlock title="GET /api/v1/buckets">
        {`GET /api/v1/buckets\n\n# Response:\n{\n  "buckets": [\n    { "name": "my-bucket", "createdAt": "2025-01-15T10:30:00Z" }\n  ],\n  "count": 1\n}`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Create Bucket
      </Heading>
      <CodeBlock title="PUT /api/v1/buckets/{name}">
        {`PUT /api/v1/buckets/my-bucket\n\n# Response (201):\n{\n  "bucket": "my-bucket",\n  "created": "2025-01-15T10:30:00Z",\n  "location": "/api/v1/buckets/my-bucket"\n}\n\n# Idempotent create:\nPUT /api/v1/buckets/my-bucket?createIfNotExists=true`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground">
        <strong>Naming rules (S3-compatible):</strong> 3–63 chars, lowercase
        letters/numbers/hyphens/dots, must start and end with letter or number,
        cannot be an IP address format.
      </p>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Check / Get / Delete Bucket
      </Heading>
      <CodeBlock title="Bucket operations">
        {`# Check bucket exists\nHEAD /api/v1/buckets/my-bucket\n# Response: 200 OK or 404 Not Found\n\n# Get bucket info\nGET /api/v1/buckets/my-bucket\n# Response: { "bucket": "my-bucket", "exists": true }\n\n# Delete bucket (must be empty)\nDELETE /api/v1/buckets/my-bucket\n# Response: 204 No Content\n# Error: 409 BUCKET_NOT_EMPTY`}
      </CodeBlock>

      {/* Object Operations */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Object Operations
      </Heading>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Upload Object
      </Heading>
      <CodeBlock title="PUT (raw body)">
        {`PUT /api/v1/buckets/my-bucket/images/photo.jpg\nContent-Type: image/jpeg\n\n<raw file content>\n\n# Response:\n{\n  "bucket": "my-bucket",\n  "key": "images/photo.jpg",\n  "etag": "d41d8cd98f00b204e9800998ecf8427e",\n  "size": 2048576,\n  "url": "/api/v1/buckets/my-bucket/images/photo.jpg"\n}`}
      </CodeBlock>
      <CodeBlock title="POST (multipart)">
        {`POST /api/v1/buckets/my-bucket/uploads/data.csv\nContent-Type: multipart/form-data\n\n# Form field: file = <file content>`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Download Object
      </Heading>
      <CodeBlock title="GET /api/v1/buckets/{bucket}/{key}">
        {`GET /api/v1/buckets/my-bucket/images/photo.jpg\n\n# Response headers:\n# Content-Length, Content-Type, Last-Modified, ETag\n# Supports HTTP Range requests for partial downloads`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Get Object Metadata
      </Heading>
      <CodeBlock title="HEAD /api/v1/buckets/{bucket}/{key}">
        {`HEAD /api/v1/buckets/my-bucket/images/photo.jpg\n\n# Returns: Content-Length, Content-Type, Last-Modified, ETag (no body)`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Delete Object
      </Heading>
      <CodeBlock title="DELETE">
        {`DELETE /api/v1/buckets/my-bucket/images/photo.jpg\n\n# Response: 204 No Content`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        List Objects
      </Heading>
      <CodeBlock title="GET /api/v1/buckets/{bucket}">
        {`GET /api/v1/buckets/my-bucket?prefix=images/&delimiter=/&max-keys=1000`}
      </CodeBlock>
      <DocTable
        headers={["Parameter", "Default", "Description"]}
        rows={[
          ["prefix", "(none)", "Filter objects by key prefix"],
          [
            "delimiter",
            "(none)",
            "Group keys by delimiter (e.g., / for virtual dirs)",
          ],
          ["max-keys", "1000", "Maximum objects to return (max 1000)"],
        ]}
      />
      <CodeBlock title="Response" language="json">
        {`{\n  "bucket": "my-bucket",\n  "prefix": "images/",\n  "delimiter": "/",\n  "maxKeys": 1000,\n  "isTruncated": false,\n  "contents": [\n    {\n      "key": "images/photo.jpg",\n      "size": 2048576,\n      "lastModified": "2025-01-15T10:30:00Z",\n      "etag": "d41d8cd98f00b204e9800998ecf8427e"\n    }\n  ],\n  "commonPrefixes": ["images/thumbnails/"]\n}`}
      </CodeBlock>

      {/* <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Additional Resources
      </Heading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>
          OpenAPI Specification:{" "}
          <code className="text-primary">docs/openapi.yaml</code>
        </li>
        <li>
          Postman Collection:{" "}
          <code className="text-primary">
            docs/beamdrop-api.postman_collection.json
          </code>
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
          Security: <code className="text-primary">docs/SECURITY.md</code>
        </li>
      </ul> */}
    </DocPage>
  );
}
