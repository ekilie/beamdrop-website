import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock } from "@/components/DocPage";
import { Heading } from "@/components/Heading";
import { Callout } from "@/components/Callout";

export const Route = createFileRoute("/docs/quickstart")({
  component: QuickStartPage,
});

function QuickStartPage() {
  return (
    <DocPage
      title="Quick Start"
      description="Get BeamDrop up and running in seconds."
    >
      <Heading
        as="h2"
        className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3"
      >
        Basic Usage
      </Heading>
      <CodeBlock title="CLI">
        {`# Share current directory\nbeamdrop\n\n# Share specific directory\nbeamdrop -dir /path/to/share\n\n# With password protection\nbeamdrop -dir /path/to/share -p mysecretpassword\n\n# With custom port\nbeamdrop -dir /path/to/share -port 9000`}
      </CodeBlock>

      <Callout type="tip">
        Use <code>-qr</code> flag to generate a QR code for quick mobile access.
      </Callout>

      <Heading
        as="h2"
        className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3"
      >
        With S3-Compatible API
      </Heading>
      <CodeBlock title="Enable API auth">
        {`# Enable API authentication\nbeamdrop -dir /path/to/share -api-auth\n\n# With HTTPS\nbeamdrop -dir /path/to/share -api-auth -tls-cert cert.pem -tls-key key.pem`}
      </CodeBlock>

      <Heading
        as="h2"
        className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3"
      >
        Docker Compose (Recommended)
      </Heading>
      <CodeBlock title="Docker Compose">
        {`# Start in background\ndocker compose up -d\n\n# View logs\ndocker compose logs -f beamdrop\n\n# Stop\ndocker compose down`}
      </CodeBlock>
      <p className="text-muted-foreground leading-relaxed">
        Configure via environment variables — create a{" "}
        <code className="text-primary">.env</code> file or export them:
      </p>
      <CodeBlock title=".env (optional)">
        {`BEAMDROP_PORT=7777\nBEAMDROP_PASSWORD=your-secret-password\nBEAMDROP_LOG_LEVEL=info\nBEAMDROP_RATE_LIMIT=100\nBEAMDROP_MAX_STORAGE=0\nBEAMDROP_API_AUTH=true\nBEAMDROP_ALLOWED_ORIGINS=https://example.com`}
      </CodeBlock>
    </DocPage>
  );
}
