import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";

export const Route = createFileRoute("/docs/presigned-urls")({
  component: PresignedUrlsPage,
});

function PresignedUrlsPage() {
  return (
    <DocPage
      title="Presigned URLs"
      description="Access objects without full HMAC auth using time-limited presigned URLs. Two methods available: client-side HMAC and server-side pretty URLs."
    >
      {/* Client-side HMAC */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Client-Side HMAC Presigned URLs
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Generate a self-contained URL with a time-limited token. No server call
        needed. Anyone with the link can access the file until it expires.
      </p>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        URL Format
      </Heading>
      <CodeBlock>
        {`GET /api/v1/buckets/{bucket}/{key}?token=<token>&expires=<timestamp>&access_key=<access_key_id>`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Token Generation
      </Heading>
      <p className="text-sm text-muted-foreground mb-3">
        The token is an HMAC-SHA256 signature of four fields joined by newlines:
      </p>
      <CodeBlock title="Token algorithm" language="markup">
        {`message = "<METHOD>\\n<BUCKET>\\n<KEY>\\n<UNIX_TIMESTAMP>"\ntoken = Base64URL(HMAC-SHA256(secret_key, message))`}
      </CodeBlock>
      <DocTable
        headers={["Field", "Example", "Description"]}
        rows={[
          ["METHOD", "GET", "HTTP method the URL is valid for"],
          ["BUCKET", "photos", "Bucket name (not the full path)"],
          ["KEY", "vacation/beach.jpg", "Object key within the bucket"],
          ["UNIX_TIMESTAMP", "1707741600", "Expiration time as Unix seconds"],
        ]}
      />

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Query Parameters
      </Heading>
      <DocTable
        headers={["Parameter", "Example", "Description"]}
        rows={[
          ["token", "aB3d...", "Base64URL-encoded HMAC-SHA256 token"],
          [
            "expires",
            "2026-02-12T12:00:00Z",
            "When the link expires (RFC 3339 or compact ISO)",
          ],
          [
            "access_key",
            "BDK_abc123",
            "Access Key ID used to generate the token",
          ],
        ]}
      />

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Example with cURL
      </Heading>
      <CodeBlock title="Generate & use a presigned URL">
        {`# Configuration\nSECRET_KEY="sk_your_secret_key"\nACCESS_KEY="BDK_your_access_key"\nBUCKET="photos"\nKEY="vacation/beach.jpg"\nEXPIRES_UNIX=$(date -d '+1 hour' +%s)  # 1 hour from now\n\n# Generate token\nMESSAGE=$(printf "GET\\n%s\\n%s\\n%s" "$BUCKET" "$KEY" "$EXPIRES_UNIX")\nTOKEN=$(printf '%s' "$MESSAGE" | openssl dgst -sha256 -hmac "$SECRET_KEY" -binary | base64 | tr '+/' '-_' | tr -d '=')\nEXPIRES_ISO=$(date -u -d@\${EXPIRES_UNIX} +%Y-%m-%dT%H:%M:%SZ)\n\n# Use the URL\ncurl "http://localhost:8090/api/v1/buckets/\${BUCKET}/\${KEY}?token=\${TOKEN}&expires=\${EXPIRES_ISO}&access_key=\${ACCESS_KEY}"`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Important Behaviors
      </Heading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
        <li>
          <strong>Always expires</strong> — there is no "permanent" presigned
          URL
        </li>
        <li>
          <strong>Tied to API key</strong> — deleting/disabling the key
          invalidates all URLs generated with it
        </li>
        <li>
          <strong>Method-specific</strong> — a token for GET will not work for
          PUT
        </li>
        <li>
          <strong>Key-specific</strong> — a token for one object cannot be
          reused for another
        </li>
        <li>
          <strong>No maximum expiry</strong> — you can set expiry far in the
          future, but it breaks on key rotation
        </li>
        <li>
          <strong>No individual revocation</strong> — to invalidate a leaked
          URL, delete the object or disable the API key
        </li>
      </ul>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Suggested Expiry Durations
      </Heading>
      <DocTable
        headers={["Use Case", "Duration"]}
        rows={[
          ["One-time download link (email, chat)", "1–24 hours"],
          ["Embedded in a web page (avatars)", "1–7 days"],
          ["Client portal / invoice download", "7–30 days"],
          ["Semi-permanent asset", "1–10 years (breaks on key rotation)"],
        ]}
      />

      {/* Server-side Pretty URLs */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-14 mb-3">
        Server-Side Pretty Presigned URLs
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        In addition to client-side HMAC URLs, Beamdrop supports a server-side
        presigned URL registry that produces short, clean{" "}
        <code className="text-primary">/dl/&#123;token&#125;</code> URLs.
      </p>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Comparison
      </Heading>
      <DocTable
        headers={["Feature", "Client-Side (HMAC)", "Server-Side (Pretty)"]}
        rows={[
          ["URL format", "/api/v1/buckets/…?token=…", "/dl/{token}"],
          [
            "Generated by",
            "Client (no server call)",
            "Server (POST /api/v1/presign)",
          ],
          ["Max downloads", "No", "Yes"],
          ["Individually revocable", "No", "Yes"],
          ["Download tracking", "No", "Yes"],
          ["Survives API key rotation", "No", "Yes"],
        ]}
      />

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Create Pretty Presigned URL
      </Heading>
      <CodeBlock title="POST /api/v1/presign">
        {`curl -X POST https://server/api/v1/presign \\\n  -H "Authorization: Bearer BDK_xxx:signature" \\\n  -H "X-Beamdrop-Date: 2026-02-24T12:00:00Z" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "bucket": "photos",\n    "key": "vacation/beach.jpg",\n    "expiresIn": 3600,\n    "maxDownloads": 100\n  }'`}
      </CodeBlock>
      <CodeBlock title="Response" language="json">
        {`{\n  "token": "a1b2c3d4e5f6789a0b1c2d3e4f5a6b7c",\n  "url": "https://server/dl/a1b2c3d4e5f6789a0b1c2d3e4f5a6b7c",\n  "bucket": "photos",\n  "key": "vacation/beach.jpg",\n  "method": "GET",\n  "expiresAt": "2026-02-24T13:00:00Z",\n  "maxDownloads": 100,\n  "createdAt": "2026-02-24T12:00:00Z"\n}`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Download (Public — No Auth)
      </Heading>
      <CodeBlock>
        {`curl https://server/dl/a1b2c3d4e5f6789a0b1c2d3e4f5a6b7c -o beach.jpg`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Revoke & List
      </Heading>
      <CodeBlock title="Revoke">
        {`curl -X DELETE https://server/api/v1/presign/a1b2c3d4e5f6789a0b1c2d3e4f5a6b7c \\\n  -H "Authorization: Bearer BDK_xxx:signature" \\\n  -H "X-Beamdrop-Date: ..."`}
      </CodeBlock>
      <CodeBlock title="List all">
        {`curl https://server/api/v1/presign \\\n  -H "Authorization: Bearer BDK_xxx:signature" \\\n  -H "X-Beamdrop-Date: ..."`}
      </CodeBlock>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Alternatives for Permanent Public Access
      </Heading>
      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
        <li>
          <strong>
            Run without <code className="text-primary">-api-auth</code>
          </strong>{" "}
          — all S3 API reads are public
        </li>
        <li>
          <strong>Proxy through your app</strong> — your backend authenticates
          to Beamdrop and streams the file to end users
        </li>
        <li>
          <strong>Use shareable links</strong> — the{" "}
          <code className="text-primary">/api/shares</code> feature provides
          token-based sharing with optional password protection and expiry
        </li>
      </ol>
    </DocPage>
  );
}
