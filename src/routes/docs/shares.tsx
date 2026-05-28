import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";

export const Route = createFileRoute("/docs/shares")({
  component: SharesPage,
});

function SharesPage() {
  return (
    <DocPage
      title="Shareable Links"
      description="Share files and folders via unique URLs with optional password protection and expiry. They bypass normal authentication."
    >
      {/* Create Link */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Create Link
      </Heading>
      <CodeBlock title="POST /api/shares">
        {`POST /api/shares\nContent-Type: application/json\n\n{\n  "path": "documents/report.pdf",\n  "password": "optional-password",\n  "expiresIn": 86400\n}`}
      </CodeBlock>
      <DocTable
        headers={["Field", "Type", "Required", "Description"]}
        rows={[
          ["path", "string", "Yes", "Path to the file or folder"],
          ["password", "string", "No", "Password-protect the link"],
          ["expiresIn", "number", "No", "Expiry in seconds"],
        ]}
      />
      <CodeBlock title="Response (201)" language="json">
        {`{\n  "token": "abc123def456",\n  "url": "http://localhost:7777/share/abc123def456",\n  "path": "documents/report.pdf",\n  "expiresAt": "2025-01-16T10:30:00Z",\n  "createdAt": "2025-01-15T10:30:00Z"\n}`}
      </CodeBlock>

      {/* List Links */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        List Links
      </Heading>
      <CodeBlock title="GET /api/shares/list">
        {`GET /api/shares/list\n\n# Response:\n[\n  {\n    "id": 1,\n    "path": "documents/report.pdf",\n    "token": "abc123def456",\n    "hasPassword": true,\n    "expiresAt": "2025-01-16T10:30:00Z",\n    "accessCount": 5,\n    "createdAt": "2025-01-15T10:30:00Z"\n  }\n]`}
      </CodeBlock>

      {/* Delete Link */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Delete Link
      </Heading>
      <CodeBlock title="DELETE /api/shares/delete">
        {`DELETE /api/shares/delete?token=abc123def456\n\n# Response:\n{ "message": "Shareable link deleted successfully" }`}
      </CodeBlock>

      {/* Access Link */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Access Link
      </Heading>
      <p className="text-sm text-muted-foreground mb-3">
        Public endpoint — no authentication required (but may require link
        password).
      </p>
      <CodeBlock title="GET /api/shares/access/{token}" language="markup">
        {`# If password-protected (no password provided):\n{\n  "requiresPassword": true,\n  "path": "documents/report.pdf"\n}\n\n# Provide password via POST or query parameter:\nGET /api/shares/access/{token}?password=my-password\n\n# or\nPOST /api/shares/access/{token}\nContent-Type: application/json\n{ "password": "my-password" }`}
      </CodeBlock>

      <CodeBlock title="File response" language="json">
        {`{\n  "path": "documents/report.pdf",\n  "name": "report.pdf",\n  "size": "1.2 MB",\n  "sizeBytes": 1258291,\n  "contentType": "application/pdf",\n  "isDir": false,\n  "isFile": true\n}`}
      </CodeBlock>

      <CodeBlock title="Directory response" language="json">
        {`{\n  "path": "documents",\n  "files": [...],\n  "isDir": true\n}`}
      </CodeBlock>

      <Heading as="h3" className="text-base font-bold font-mono uppercase tracking-tight mt-6 mb-2">
        Download & Preview Modes
      </Heading>
      <CodeBlock>
        {`# Download mode:\nGET /api/shares/access/{token}?mode=download\n\n# Inline preview mode:\nGET /api/shares/access/{token}?mode=inline`}
      </CodeBlock>

      {/* Web UI */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Using the Web UI
      </Heading>
      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
        <li>Navigate to a file or folder in the browser</li>
        <li>Right-click and select "Share Link" from the context menu</li>
        <li>Configure optional password and expiry settings</li>
        <li>Click "Generate Link" and copy the URL</li>
      </ol>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Security Considerations
      </Heading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Password-protected links require the correct password to access</li>
        <li>Expired links are automatically rejected</li>
        <li>Access to shareable links is tracked for monitoring</li>
        <li>Links can be revoked at any time by deleting them</li>
        <li>
          Public share links bypass authentication but can still be
          password-protected
        </li>
      </ul>
    </DocPage>
  );
}
