import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock } from "@/components/DocPage";
import { Heading } from "@/components/Heading";
import { DocTabs } from "@/components/DocTabs";
import { Callout } from "@/components/Callout";

export const Route = createFileRoute("/docs/installation")({
  component: InstallationPage,
});

function InstallationPage() {
  return (
    <DocPage
      title="Installation"
      description="Install BeamDrop from source, download pre-built binaries, or use Docker."
    >
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Quick Install (macOS & Linux)
      </Heading>
      <CodeBlock title="One-line install">
        {`curl -fsSL https://raw.githubusercontent.com/ekilie/beamdrop/main/docs/install.sh | sh`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground mb-2">
        Or inspect the script first:
      </p>
      <CodeBlock>
        {`curl -fsSL https://raw.githubusercontent.com/ekilie/beamdrop/main/docs/install.sh -o install.sh\nless install.sh\nsh install.sh`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground">
        Options via environment variables:{" "}
        <code className="text-primary">
          BEAMDROP_VERSION=v1.0.0 sh install.sh
        </code>{" "}
        or{" "}
        <code className="text-primary">
          BEAMDROP_INSTALL=~/.local/bin sh install.sh
        </code>
        .
      </p>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        From Source
      </Heading>
      <CodeBlock title="Build from source">
        {`git clone https://github.com/ekilie/beamdrop.git\ncd beamdrop\nmake build`}
      </CodeBlock>

      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Platform Binaries
      </Heading>
      <DocTabs
        tabs={[
          {
            label: "macOS",
            value: "macos",
            content: (
              <DocTabs
                tabs={[
                  {
                    label: "Apple Silicon",
                    value: "arm",
                    content: (
                      <CodeBlock>{`curl -L https://github.com/ekilie/beamdrop/releases/latest/download/beamdrop-darwin-arm64.tar.gz -o beamdrop-darwin-arm64.tar.gz\nsudo tar -C /usr/local/bin -xzf beamdrop-darwin-arm64.tar.gz\nrm beamdrop-darwin-arm64.tar.gz`}</CodeBlock>
                    ),
                  },
                  {
                    label: "Intel",
                    value: "intel",
                    content: (
                      <CodeBlock>{`curl -L https://github.com/ekilie/beamdrop/releases/latest/download/beamdrop-darwin-amd64.tar.gz -o beamdrop-darwin-amd64.tar.gz\nsudo tar -C /usr/local/bin -xzf beamdrop-darwin-amd64.tar.gz\nrm beamdrop-darwin-amd64.tar.gz`}</CodeBlock>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            label: "Linux",
            value: "linux",
            content: (
              <DocTabs
                tabs={[
                  {
                    label: "amd64",
                    value: "amd64",
                    content: (
                      <CodeBlock>{`curl -L https://github.com/ekilie/beamdrop/releases/latest/download/beamdrop-linux-amd64.tar.gz -o beamdrop-linux-amd64.tar.gz\nsudo tar -C /usr/local/bin -xzf beamdrop-linux-amd64.tar.gz\nrm beamdrop-linux-amd64.tar.gz`}</CodeBlock>
                    ),
                  },
                  {
                    label: "arm64",
                    value: "arm64",
                    content: (
                      <CodeBlock>{`curl -L https://github.com/ekilie/beamdrop/releases/latest/download/beamdrop-linux-arm64.tar.gz -o beamdrop-linux-arm64.tar.gz\nsudo tar -C /usr/local/bin -xzf beamdrop-linux-arm64.tar.gz\nrm beamdrop-linux-arm64.tar.gz`}</CodeBlock>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            label: "Windows",
            value: "windows",
            content: (
              <p className="text-sm text-muted-foreground">
                Download the latest <code>.zip</code> from the{" "}
                <a
                  href="https://github.com/ekilie/beamdrop/releases"
                  className="text-primary hover:underline"
                >
                  releases page
                </a>
                , extract it, and add <code>beamdrop.exe</code> to your PATH.
              </p>
            ),
          },
          {
            label: "Docker",
            value: "docker",
            content: (
              <CodeBlock>{`docker build -t beamdrop .\n\ndocker run -d \\\n  --name beamdrop \\\n  -p 7777:7777 \\\n  -v beamdrop-data:/data \\\n  beamdrop`}</CodeBlock>
            ),
          },
        ]}
      />
      <Callout type="info">
        The Docker image is ~39 MB, runs as non-root, and includes a HEALTHCHECK
        against <code>/health/live</code>.
      </Callout>
    </DocPage>
  );
}
