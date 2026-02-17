import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock } from "@/components/DocPage";

export const Route = createFileRoute("/docs/shares")({
  component: SharesPage,
});

function SharesPage() {
  return (
    <DocPage
      title="Shareable Links"
      description="Create password-protected shareable links for files and folders."
    >
      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Creating a Shareable Link
      </h2>
      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
        <li>Navigate to the file browser</li>
        <li>Right-click on a file or folder and select "Share Link" from the context menu</li>
        <li>
          Configure optional settings:
          <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
            <li><strong>Password</strong>: Protect the link with a password</li>
            <li><strong>Expiry</strong>: Set when the link should expire (in hours)</li>
          </ul>
        </li>
        <li>Click "Generate Link" to create the shareable URL</li>
        <li>Copy the link and share it with others</li>
      </ol>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Managing Links
      </h2>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>View all active shareable links in the "Shares" section of the sidebar</li>
        <li>See access statistics including view count</li>
        <li>Delete links when they're no longer needed</li>
        <li>Links are automatically removed after expiration</li>
      </ul>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Security Considerations
      </h2>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Password-protected links require the correct password to access</li>
        <li>Expired links are automatically rejected</li>
        <li>Access to shareable links is tracked for monitoring</li>
        <li>Links can be revoked at any time by deleting them</li>
        <li>Public share links bypass authentication but can still be password-protected</li>
      </ul>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        API Endpoints
      </h2>
      <CodeBlock title="Shares API">
        {`# Create a new shareable link\ncurl -X POST http://localhost:8080/api/shares \\\n  -H "Content-Type: application/json" \\\n  -d '{"path": "/docs/report.pdf", "password": "secret", "expiresIn": 72}'\n\n# List all shareable links\ncurl http://localhost:8080/api/shares/list\n\n# Delete a shareable link\ncurl -X DELETE "http://localhost:8080/api/shares/delete?token=<token>"\n\n# Public access endpoint (no auth required)\ncurl http://localhost:8080/share/<token>`}
      </CodeBlock>
    </DocPage>
  );
}
