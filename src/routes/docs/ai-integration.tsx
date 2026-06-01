import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";
import { Callout } from "@/components/Callout";
import { Steps, Step } from "@/components/Steps";

export const Route = createFileRoute("/docs/ai-integration")({
  component: AiIntegrationPage,
});

function AiIntegrationPage() {
  return (
    <DocPage
      title="AI & Agent Integration"
      description="Make Beamdrop accessible to AI agents and LLMs with llms.txt discovery, agent skills, and the MCP server."
    >
      {/* Overview */}
      <p className="text-muted-foreground leading-relaxed mb-6">
        Beamdrop is designed for agentic development. AI agents can discover
        your server's capabilities, install specialized skills, and interact
        with your files programmatically through the MCP protocol or direct HTTP
        API calls.
      </p>

      {/* LLM Discovery */}
      <Heading
        as="h2"
        className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3"
      >
        LLM Discovery (llms.txt)
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Every Beamdrop server exposes machine-readable documentation at{" "}
        <code className="text-primary">/llms.txt</code> following the{" "}
        <a
          href="https://llmstxt.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          llmstxt.org
        </a>{" "}
        standard. This lets LLMs and agents instantly understand your server's
        API without any manual configuration.
      </p>

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        Endpoints
      </Heading>
      <DocTable
        headers={["URL", "Content", "Use Case"]}
        rows={[
          [
            "GET /llms.txt",
            "Concise API overview",
            "Quick context for LLMs — auth, endpoints, validation rules, error codes",
          ],
          [
            "GET /llms.txt?full=true",
            "Complete API reference",
            "Full inlined reference — all endpoints with request/response schemas, Go SDK, MCP tools",
          ],
        ]}
      />

      <Callout type="info" title="No authentication required">
        <p className="text-sm">
          The <code className="text-primary">/llms.txt</code> endpoint is public
          — no API key or session auth needed. This allows any LLM to discover
          your server's capabilities.
        </p>
      </Callout>

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        What's Included
      </Heading>
      <p className="text-sm text-muted-foreground mb-3">
        The standard <code className="text-primary">/llms.txt</code> response
        covers:
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm mb-4">
        <li>Server overview and capabilities</li>
        <li>
          Authentication — HMAC-SHA256 signing algorithm, key formats (
          <code className="text-primary">BDK_</code> +{" "}
          <code className="text-primary">sk_</code>), clock skew tolerance
        </li>
        <li>All API endpoints — buckets, objects, presigned URLs, API keys</li>
        <li>
          Validation rules — bucket name regex, object key constraints, upload
          limits
        </li>
        <li>Error codes with HTTP status and retry guidance</li>
        <li>Rate limiting tiers and headers</li>
      </ul>

      <p className="text-sm text-muted-foreground mb-3">
        The full version (<code className="text-primary">?full=true</code>)
        additionally includes:
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm mb-4">
        <li>Complete request/response JSON schemas for every endpoint</li>
        <li>CLI flags and environment variables</li>
        <li>Go client SDK reference with code examples</li>
        <li>MCP server tool reference table</li>
        <li>Storage internals (atomic writes, locking)</li>
        <li>Security headers and CORS configuration</li>
        <li>Health and monitoring endpoints</li>
      </ul>

      <CodeBlock title="Fetch llms.txt">
        {`# Quick overview
curl https://your-server.com/llms.txt

# Full reference (all endpoints, schemas, SDK examples)
curl "https://your-server.com/llms.txt?full=true"`}
      </CodeBlock>

      {/* Agent Skills */}
      <Heading
        as="h2"
        className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3"
      >
        Agent Skills
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Beamdrop provides{" "}
        <a
          href="https://agentskills.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          Agent Skills
        </a>{" "}
        — structured instruction files that AI agents (GitHub Copilot, Claude,
        Cursor, Windsurf, etc.) can discover and load to work with Beamdrop more
        accurately.
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        Skills teach agents the correct API signatures, authentication flow,
        error handling patterns, presigned URL strategies, and Go SDK usage — so
        they generate working code on the first try instead of guessing.
      </p>

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        Install Skills
      </Heading>

      <CodeBlock title="Using npx skills (recommended)">
        {`# Install all Beamdrop skills
npx skills add ekilie/beamdrop-skills

# Install a specific skill
npx skills add ekilie/beamdrop-skills --skill beamdrop

# List available skills
npx skills add ekilie/beamdrop-skills --list`}
      </CodeBlock>

      <CodeBlock title="Using Playbooks">
        {`npx playbooks add skill ekilie/beamdrop-skills`}
      </CodeBlock>

      <CodeBlock title="Using Context7">
        {`npx ctx7 skills install ekilie/beamdrop-skills`}
      </CodeBlock>

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        Claude Code Plugin
      </Heading>
      <CodeBlock title="Add as Claude Code plugin">
        {`/plugin add ekilie/beamdrop-skills`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground mb-4">
        Also supported in Factory's{" "}
        <a
          href="https://docs.factory.ai/cli/configuration/plugins#claude-code-compatibility"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          Droid
        </a>
        .
      </p>

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        What Skills Cover
      </Heading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm mb-4">
        <li>
          <strong>Authentication</strong> — HMAC-SHA256 signing algorithm with
          exact key formats and step-by-step process
        </li>
        <li>
          <strong>Go Client SDK</strong> — Complete API with{" "}
          <code className="text-primary">PutObject</code>,{" "}
          <code className="text-primary">PutObjectReader</code>,{" "}
          <code className="text-primary">ListObjects</code>,{" "}
          <code className="text-primary">PresignObjectURL</code>, and error
          handling
        </li>
        <li>
          <strong>Presigned URL Decision Guide</strong> — When to use
          client-side HMAC vs server-side database-tracked URLs
        </li>
        <li>
          <strong>HTTP API Reference</strong> — All endpoints with exact
          request/response formats for any language
        </li>
        <li>
          <strong>Error Handling</strong> — All error codes with recommended
          agent actions (retry, fix, abort)
        </li>
        <li>
          <strong>Validation Rules</strong> — Bucket name regex, object key
          constraints, upload limits
        </li>
        <li>
          <strong>Common Workflows</strong> — Store artifacts, upload with
          dedup, browse files, scoped API keys
        </li>
      </ul>

      {/* MCP Server */}
      <Heading
        as="h2"
        className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3"
      >
        MCP Server
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Beamdrop includes a built-in{" "}
        <a
          href="https://modelcontextprotocol.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          Model Context Protocol (MCP)
        </a>{" "}
        server at the <code className="text-primary">/mcp</code> endpoint. It
        uses Streamable HTTP transport with JSON-RPC 2.0 — no separate process,
        no TypeScript build. It runs natively as part of the Beamdrop server.
      </p>

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        Endpoints
      </Heading>
      <DocTable
        headers={["Method", "URL", "Auth", "Description"]}
        rows={[
          [
            "GET",
            "/mcp",
            "None (public)",
            "Discovery — returns protocol version, transport, available methods",
          ],
          [
            "POST",
            "/mcp",
            "API key (HMAC-SHA256)",
            "JSON-RPC 2.0 requests — initialize, ping, tools/list, tools/call",
          ],
        ]}
      />

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        Setup
      </Heading>
      <Steps>
        <Step label="1" title="Ensure API auth is enabled">
          <CodeBlock>{`beamdrop -dir /path/to/share -api-auth`}</CodeBlock>
        </Step>
        <Step label="2" title="Add to your AI assistant">
          <p className="text-sm text-muted-foreground mb-3">
            Add the MCP server configuration to your assistant. The MCP endpoint
            uses the same HMAC-SHA256 authentication as the S3 API.
          </p>
          <CodeBlock
            title="Claude Desktop — claude_desktop_config.json"
            language="json"
          >
            {`{
  "mcpServers": {
    "beamdrop": {
      "url": "https://your-server.com/mcp",
      "headers": {
        "Authorization": "Bearer BDK_your_key:signature",
        "X-Beamdrop-Date": "ISO-8601-timestamp"
      }
    }
  }
}`}
          </CodeBlock>
          <CodeBlock title="VS Code — .vscode/mcp.json" language="json">
            {`{
  "servers": {
    "beamdrop": {
      "url": "https://your-server.com/mcp",
      "headers": {
        "Authorization": "Bearer BDK_your_key:signature",
        "X-Beamdrop-Date": "ISO-8601-timestamp"
      }
    }
  }
}`}
          </CodeBlock>
        </Step>
      </Steps>

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        Available Tools (16)
      </Heading>

      <Heading
        as="h4"
        className="text-sm font-bold font-mono uppercase tracking-tight mt-4 mb-2"
      >
        Bucket Tools
      </Heading>
      <DocTable
        headers={["Tool", "Parameters", "Description"]}
        rows={[
          ["list_buckets", "none", "List all storage buckets"],
          [
            "create_bucket",
            "name, idempotent?",
            "Create a bucket (idempotent by default)",
          ],
          ["delete_bucket", "name", "Delete an empty bucket"],
          ["bucket_exists", "name", "Check if a bucket exists"],
        ]}
      />

      <Heading
        as="h4"
        className="text-sm font-bold font-mono uppercase tracking-tight mt-4 mb-2"
      >
        Object Tools
      </Heading>
      <DocTable
        headers={["Tool", "Parameters", "Description"]}
        rows={[
          [
            "list_objects",
            "bucket, prefix?, delimiter?, maxKeys?",
            "List objects with S3-style filtering",
          ],
          [
            "put_object",
            "bucket, key, content, isBase64?",
            "Upload text or base64-encoded binary content",
          ],
          [
            "get_object",
            "bucket, key",
            "Download object (text or base64 for binary)",
          ],
          [
            "head_object",
            "bucket, key",
            "Get object metadata without downloading",
          ],
          ["delete_object", "bucket, key", "Delete an object"],
        ]}
      />

      <Heading
        as="h4"
        className="text-sm font-bold font-mono uppercase tracking-tight mt-4 mb-2"
      >
        Presigned URL Tools
      </Heading>
      <DocTable
        headers={["Tool", "Parameters", "Description"]}
        rows={[
          [
            "create_presigned_url",
            "bucket, key, method?, expiresIn?, maxDownloads?",
            "Create a revocable download link",
          ],
          ["list_presigned_urls", "none", "List all presigned URLs"],
          [
            "get_presigned_url",
            "token",
            "Get presigned URL details and download count",
          ],
          [
            "delete_presigned_url",
            "token",
            "Revoke a presigned URL immediately",
          ],
        ]}
      />

      <Heading
        as="h4"
        className="text-sm font-bold font-mono uppercase tracking-tight mt-4 mb-2"
      >
        API Key Tools
      </Heading>
      <DocTable
        headers={["Tool", "Parameters", "Description"]}
        rows={[
          ["list_api_keys", "none", "List all API keys (secrets not included)"],
          [
            "create_api_key",
            "name?, bucketScope?, permissions?",
            "Create a new API key",
          ],
          ["delete_api_key", "id", "Delete an API key"],
        ]}
      />

      {/* Agent Instructions */}
      <Heading
        as="h2"
        className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3"
      >
        Webhooks
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Beamdrop supports real-time event notifications via webhooks. Register
        HTTP callback URLs and receive HMAC-SHA256 signed POST requests when
        events occur — object uploads, bucket creation, share links, presigned
        URLs, and more.
      </p>

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        Webhook API
      </Heading>
      <DocTable
        headers={["Method", "Endpoint", "Description"]}
        rows={[
          [
            "POST",
            "/api/v1/webhooks",
            "Create webhook (returns signing secret once)",
          ],
          ["GET", "/api/v1/webhooks", "List all webhooks"],
          [
            "PATCH",
            "/api/v1/webhooks/{id}",
            "Update webhook (name, url, enabled, events, rotate_secret)",
          ],
          [
            "DELETE",
            "/api/v1/webhooks/{id}",
            "Delete webhook and delivery history",
          ],
          ["POST", "/api/v1/webhooks/{id}/test", "Send a synthetic test event"],
          [
            "GET",
            "/api/v1/webhooks/{id}/deliveries",
            "List recent delivery attempts",
          ],
        ]}
      />

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        Event Types
      </Heading>
      <DocTable
        headers={["Event", "Description"]}
        rows={[
          ["beamdrop.object.created", "Object uploaded or created"],
          ["beamdrop.object.updated", "Object content updated"],
          ["beamdrop.object.deleted", "Object deleted"],
          ["beamdrop.bucket.created", "Bucket created"],
          ["beamdrop.bucket.deleted", "Bucket deleted"],
          ["beamdrop.share.created", "Shareable link created"],
          ["beamdrop.share.deleted", "Shareable link deleted"],
          ["beamdrop.presign.created", "Presigned URL created"],
          ["beamdrop.presign.deleted", "Presigned URL revoked"],
        ]}
      />
      <p className="text-sm text-muted-foreground mb-4">
        Wildcards supported:{" "}
        <code className="text-primary">beamdrop.object.*</code>,{" "}
        <code className="text-primary">beamdrop.bucket.*</code>,{" "}
        <code className="text-primary">beamdrop.share.*</code>,{" "}
        <code className="text-primary">beamdrop.presign.*</code>
      </p>

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        Webhook Signing
      </Heading>
      <p className="text-sm text-muted-foreground mb-3">
        Every delivery is signed with HMAC-SHA256. Verify in your handler:
      </p>
      <CodeBlock title="Signature verification">
        {`signature_base = timestamp + "\\n" + delivery_id + "\\n" + request_body
expected = "v1=" + hex(HMAC-SHA256(signature_base, webhook_secret))
# Compare with X-Beamdrop-Signature header (constant-time)`}
      </CodeBlock>

      <Heading
        as="h3"
        className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2"
      >
        Delivery Headers
      </Heading>
      <DocTable
        headers={["Header", "Description"]}
        rows={[
          ["X-Beamdrop-Webhook-Id", "Webhook ID"],
          ["X-Beamdrop-Event", "Event type (e.g., beamdrop.object.created)"],
          ["X-Beamdrop-Delivery-Id", "Unique delivery UUID"],
          ["X-Beamdrop-Timestamp", "Unix timestamp"],
          ["X-Beamdrop-Signature", "v1= + hex HMAC-SHA256 signature"],
        ]}
      />

      <Callout type="info" title="Delivery behavior">
        <p className="text-sm">
          Up to 8 retry attempts with exponential backoff (2s base, 15min max).
          Retryable HTTP codes: 408, 425, 429, 500, 502, 503, 504. 10-second
          timeout per attempt. Dead-lettered after max attempts. 7-day delivery
          history retention.
        </p>
      </Callout>

      <CodeBlock title="Create a webhook">
        {`curl -X POST https://your-server.com/api/v1/webhooks \\
  -H "Authorization: Bearer BDK_xxx:signature" \\
  -H "X-Beamdrop-Date: 2024-01-15T10:30:00Z" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"my-hook","url":"https://example.com/webhook","event_types":["beamdrop.object.*"]}'
# Response: {"webhook":{...}, "secret":"whsec_...", "warning":"Save the secret now..."}`}
      </CodeBlock>

      {/* Agent Instructions */}
      <Heading
        as="h2"
        className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3"
      >
        Agent Instructions
      </Heading>
      <p className="text-muted-foreground leading-relaxed mb-4">
        For agents that don't support skills or MCP, the{" "}
        <a
          href="https://github.com/ekilie/beamdrop/blob/main/docs/ai/agent-instructions.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          agent-instructions.md
        </a>{" "}
        file provides a standalone reference that can be pasted into any agent's
        system prompt or context window. It covers:
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm mb-4">
        <li>
          Complete HMAC-SHA256 signing examples in{" "}
          <strong>curl, Python, and JavaScript</strong>
        </li>
        <li>All API endpoints with exact request/response JSON formats</li>
        <li>Full error code reference with recommended agent actions</li>
        <li>
          Presigned URL decision guide (client-side HMAC vs server-side
          database-tracked)
        </li>
        <li>Step-by-step workflow recipes for common tasks</li>
        <li>Rate limiting details and retry strategies</li>
      </ul>

      {/* Quick Reference */}
      <Heading
        as="h2"
        className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3"
      >
        Quick Reference
      </Heading>
      <DocTable
        headers={["Resource", "Location", "Purpose"]}
        rows={[
          [
            "llms.txt",
            "GET /llms.txt",
            "Machine-readable API overview for LLMs",
          ],
          [
            "llms-full.txt",
            "GET /llms.txt?full=true",
            "Complete API reference with schemas and SDK docs",
          ],
          [
            "Agent Skills",
            "npx skills add ekilie/beamdrop-skills",
            "Structured skill files for AI coding agents",
          ],
          [
            "MCP Server",
            "GET/POST /mcp",
            "Built-in MCP server with 16 tools (Streamable HTTP transport)",
          ],
          [
            "Webhooks",
            "/api/v1/webhooks",
            "Real-time HMAC-signed event notifications",
          ],
          [
            "Agent Instructions",
            "docs/ai/agent-instructions.md",
            "Standalone reference for any agent's context window",
          ],
          [
            "Skills Repo",
            "github.com/ekilie/beamdrop-skills",
            "Open source agent skills repository",
          ],
        ]}
      />
    </DocPage>
  );
}
