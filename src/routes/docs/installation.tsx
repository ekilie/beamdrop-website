import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock } from "@/components/DocPage";

export const Route = createFileRoute("/docs/installation")({
  component: InstallationPage,
});

function InstallationPage() {
  return (
    <DocPage
      title="Installation"
      description="Install BeamDrop from source, download pre-built binaries, or use Docker."
    >
      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        From Source
      </h2>
      <CodeBlock title="Build from source">
        {`git clone https://github.com/ekilie/beamdrop.git\ncd beamdrop\nmake build`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        macOS (Apple Silicon)
      </h2>
      <CodeBlock>
        {`curl -L https://github.com/ekilie/beamdrop/releases/latest/download/beamdrop-darwin-arm64.tar.gz -o beamdrop-darwin-arm64.tar.gz\nsudo tar -C /usr/local/bin -xzf beamdrop-darwin-arm64.tar.gz\nrm beamdrop-darwin-arm64.tar.gz`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        macOS (Intel)
      </h2>
      <CodeBlock>
        {`curl -L https://github.com/ekilie/beamdrop/releases/latest/download/beamdrop-darwin-amd64.tar.gz -o beamdrop-darwin-amd64.tar.gz\nsudo tar -C /usr/local/bin -xzf beamdrop-darwin-amd64.tar.gz\nrm beamdrop-darwin-amd64.tar.gz`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Linux (amd64)
      </h2>
      <CodeBlock>
        {`curl -L https://github.com/ekilie/beamdrop/releases/latest/download/beamdrop-linux-amd64.tar.gz -o beamdrop-linux-amd64.tar.gz\nsudo tar -C /usr/local/bin -xzf beamdrop-linux-amd64.tar.gz\nrm beamdrop-linux-amd64.tar.gz`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Linux (arm64)
      </h2>
      <CodeBlock>
        {`curl -L https://github.com/ekilie/beamdrop/releases/latest/download/beamdrop-linux-arm64.tar.gz -o beamdrop-linux-arm64.tar.gz\nsudo tar -C /usr/local/bin -xzf beamdrop-linux-arm64.tar.gz\nrm beamdrop-linux-arm64.tar.gz`}
      </CodeBlock>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Windows
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Download the latest <code className="text-primary">.zip</code> from the{" "}
        <a
          href="https://github.com/ekilie/beamdrop/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          releases page
        </a>
        , extract it, and add <code className="text-primary">beamdrop.exe</code> to your PATH.
      </p>

      <h2 className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Docker
      </h2>
      <CodeBlock title="Docker">
        {`# Build the image\ndocker build -t beamdrop .\n\n# Run with a persistent volume\ndocker run -d \\\n  --name beamdrop \\\n  -p 7777:7777 \\\n  -v beamdrop-data:/data \\\n  beamdrop`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground">
        The image is ~39 MB, runs as non-root, and includes a HEALTHCHECK against{" "}
        <code className="text-primary">/health/live</code>.
      </p>
    </DocPage>
  );
}
