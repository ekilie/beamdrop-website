import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";
import { Callout } from "@/components/Callout";

export const Route = createFileRoute("/docs/authentication")({
  component: AuthPage,
});

function AuthPage() {
  return (
    <DocPage
      title="Authentication"
      description="BeamDrop has two independent auth systems: password auth for the web UI, and API key auth for the S3 API."
    >
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Overview
      </Heading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>
          <strong>Password Auth</strong> — Protects the web UI and file
          management endpoints. Uses JWT tokens stored in cookies.
        </li>
        <li>
          <strong>API Key Auth</strong> — Protects the S3-compatible API (
          <code className="text-primary">/api/v1/buckets/*</code>). Uses
          HMAC-SHA256 signed requests.
        </li>
      </ul>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Password Auth (Web UI)
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        When started with{" "}
        <code className="text-primary">-p &lt;password&gt;</code>, all routes
        except health probes, login, and static assets require authentication.
      </p>
      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Public Routes (Always Accessible)
      </Heading>
      <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
        <li>
          <code className="text-primary">/</code> — Landing page
        </li>
        <li>
          <code className="text-primary">/auth/login</code>,{" "}
          <code className="text-primary">/auth/status</code>
        </li>
        <li>
          <code className="text-primary">/health/*</code>,{" "}
          <code className="text-primary">/ready</code>,{" "}
          <code className="text-primary">/metrics</code>
        </li>
        <li>
          <code className="text-primary">/assets/*</code>,{" "}
          <code className="text-primary">/static/*</code>
        </li>
        <li>
          <code className="text-primary">/share/*</code> — Shareable link pages
        </li>
        <li>
          <code className="text-primary">/api/shares/access/*</code> — Shareable
          link API (has own password protection)
        </li>
      </ul>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Login / Logout
      </Heading>
      <CodeBlock title="Check auth status">
        {`GET /auth/status\n\n# Response:\n{\n  "authEnabled": true,\n  "authenticated": false\n}`}
      </CodeBlock>
      <CodeBlock title="Login">
        {`POST /auth/login\nContent-Type: application/json\n\n{ "password": "mysecretpassword" }\n\n# Response:\n{\n  "success": true,\n  "token": "eyJhbGciOi...",\n  "message": "Login successful"\n}`}
      </CodeBlock>
      <CodeBlock title="Logout">
        {`POST /auth/logout\nAuthorization: Bearer <token>\n\n# Response:\n{ "message": "Logged out successfully" }`}
      </CodeBlock>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        API Key Auth (S3 API)
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        When started with <code className="text-primary">-api-auth</code>, every
        request to <code className="text-primary">/api/v1/buckets/*</code> must
        include:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
        <li>
          <code className="text-primary">
            Authorization: Bearer &lt;access_key_id&gt;:&lt;signature&gt;
          </code>{" "}
          header
        </li>
        <li>
          <code className="text-primary">
            X-Beamdrop-Date: &lt;ISO 8601 timestamp&gt;
          </code>{" "}
          header
        </li>
      </ol>
      <Callout type="warning" title="Clock Skew">
        The timestamp must be within <strong>15 minutes</strong> of the server
        time. Ensure your system clock is synchronized.
      </Callout>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        HMAC Signature Generation
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        The signature is computed as:
      </p>
      <Callout type="info" title="Save Your Secret Key">
        The <code>secretKey</code> is shown only once when you create an API key. Store it securely.
      </Callout>
      <CodeBlock title="Signature algorithm" language="markup">
        {`string_to_sign = "<METHOD>\\n<PATH>\\n<TIMESTAMP>"\nsignature = Base64(HMAC-SHA256(secret_key, string_to_sign))`}
      </CodeBlock>
      <CodeBlock title="Example with curl">
        {`TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")\nSTRING_TO_SIGN="GET\\n/api/v1/buckets\\n\${TIMESTAMP}"\nSIGNATURE=$(echo -n "$STRING_TO_SIGN" | openssl dgst -sha256 -hmac "$SECRET_KEY" -binary | base64)\n\ncurl http://localhost:8080/api/v1/buckets \\\n  -H "Authorization: Bearer \${ACCESS_KEY}:\${SIGNATURE}" \\\n  -H "X-Beamdrop-Date: \${TIMESTAMP}"`}
      </CodeBlock>
    </DocPage>
  );
}
