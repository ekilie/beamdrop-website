import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
    Upload, Download, FolderOpen, Search, Shield, Globe, Terminal,
    Zap, Lock, QrCode, Share2, HardDrive, ArrowRight, Copy, Check,
    Key, ExternalLink, BookOpen, Container, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
    component: Landing,
});

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const }
    })
};

const CodeBlock = ({ children, title }: { children: string; title?: string }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-lg overflow-hidden border border-border bg-background/80">
            {title && (
                <div className="px-4 py-2 border-b border-border bg-muted/50 flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{title}</span>
                    <button onClick={copy} className="text-muted-foreground hover:text-foreground transition-colors">
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            )}
            <pre className="p-4 overflow-x-auto text-sm font-mono text-foreground/90 scrollbar-thin">
                <code>{children}</code>
            </pre>
        </div>
    );
};

const features = [
    { icon: Upload, title: "File Upload", desc: "Drag & drop or programmatic uploads with progress tracking" },
    { icon: Download, title: "File Download", desc: "Direct downloads with resume support" },
    { icon: FolderOpen, title: "File Browser", desc: "Modern web UI for browsing and managing files" },
    { icon: Search, title: "Search", desc: "Full-text search across all files and directories" },
    { icon: Shield, title: "Security", desc: "HTTPS/TLS, CORS, CSP headers, rate limiting & password auth" },
    { icon: Share2, title: "Shareable Links", desc: "Generate links with password protection and expiry" },
    { icon: QrCode, title: "QR Codes", desc: "Instant QR code generation for easy mobile access" },
    { icon: HardDrive, title: "S3 API", desc: "S3-compatible API for programmatic integration" },
    { icon: Lock, title: "HMAC Auth", desc: "HMAC-SHA256 signed API authentication" },
    { icon: Globe, title: "Cross-Platform", desc: "Single binary that runs on Linux, macOS, and Windows" },
    { icon: Container, title: "Docker Ready", desc: "~39 MB image, non-root, health checks, Compose support" },
    { icon: BarChart3, title: "Prometheus Metrics", desc: "Built-in /metrics endpoint with Grafana dashboard" },
];

function Landing() {
    return (
        <div className="overflow-x-hidden">
            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />
                <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-[120px]" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Open Source &bull; Self-Hosted</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-5xl sm:text-7xl md:text-8xl font-bold font-mono uppercase tracking-tight leading-[0.9] mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        Beam<span className="text-primary">Drop</span>
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                    >
                        A lightweight, self-hosted file sharing server with S3-compatible API.
                        Built with Go and React.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link to="/docs">
                            <Button size="lg" className="gap-2 font-mono uppercase tracking-wide text-sm px-8 h-12">
                                <BookOpen className="w-4 h-4" />
                                Read the Docs
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <a href="https://github.com/ekilie/beamdrop" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg" className="gap-2 font-mono uppercase tracking-wide text-sm px-8 h-12">
                                <ExternalLink className="w-4 h-4" />
                                View on GitHub
                            </Button>
                        </a>
                    </motion.div>

                    {/* Quick start snippet */}
                    <motion.div
                        className="mt-14 max-w-lg mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                    >
                        <CodeBlock title="Quick Start">
                            {`# Share current directory\nbeamdrop\n\n# With password\nbeamdrop -p mysecret`}
                        </CodeBlock>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        custom={0}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold font-mono uppercase tracking-tight mb-4">
                            Everything you need
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            From simple file sharing to full S3-compatible storage — in a single binary.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {features.map((f, i) => (
                            <motion.div key={f.title} variants={fadeUp} custom={i}>
                                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors group">
                                    <CardContent className="p-6 flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <f.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-mono text-sm font-bold uppercase tracking-wide mb-1">{f.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Installation */}
            <section className="py-24 px-4 border-t border-border/50">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={0}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold font-mono uppercase tracking-tight mb-4">
                            Get Started in Seconds
                        </h2>
                        <p className="text-muted-foreground">Install from source or download a pre-built binary.</p>
                    </motion.div>

                    <motion.div
                        className="space-y-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeUp} custom={1}>
                            <CodeBlock title="Install from source">
                                {`git clone https://github.com/ekilie/beamdrop.git\ncd beamdrop\nmake build`}
                            </CodeBlock>
                        </motion.div>

                        <motion.div variants={fadeUp} custom={2}>
                            <CodeBlock title="Docker (recommended)">
                                {`docker run -d \\\n  --name beamdrop \\\n  -p 7777:7777 \\\n  -v beamdrop-data:/data \\\n  beamdrop`}
                            </CodeBlock>
                        </motion.div>

                        <motion.div variants={fadeUp} custom={3}>
                            <CodeBlock title="Usage examples">
                                {`# Share a specific directory\nbeamdrop -dir /path/to/share\n\n# With custom port & password\nbeamdrop -dir /path/to/share -port 9000 -p mysecret\n\n# Enable S3 API with HTTPS\nbeamdrop -dir /data -api-auth -tls-cert cert.pem -tls-key key.pem`}
                            </CodeBlock>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CLI Flags Table */}
            <section className="py-24 px-4 border-t border-border/50">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={0}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold font-mono uppercase tracking-tight mb-4">
                            Configuration
                        </h2>
                    </motion.div>

                    <motion.div
                        className="overflow-x-auto rounded-lg border border-border"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={1}
                    >
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/30">
                                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Flag</th>
                                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Description</th>
                                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Default</th>
                                </tr>
                            </thead>
                            <tbody className="font-mono text-xs">
                                {[
                                    ["-dir", "Directory to share", "Current dir"],
                                    ["-port", "Server port", "Auto-detect"],
                                    ["-p", "Password for web auth", "None"],
                                    ["-api-auth", "Enable API key auth", "false"],
                                    ["-tls-cert", "TLS certificate path", "None"],
                                    ["-tls-key", "TLS private key path", "None"],
                                    ["-allowed-origins", "CORS allowed origins", "None"],
                                    ["-log-level", "Log level (debug/info/warn/error)", "info"],
                                ].map(([flag, desc, def]) => (
                                    <tr key={flag} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3 text-primary font-bold">{flag}</td>
                                        <td className="px-4 py-3 text-foreground/80">{desc}</td>
                                        <td className="px-4 py-3 text-muted-foreground">{def}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* S3 API Section */}
            <section className="py-24 px-4 border-t border-border/50">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={0}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 mb-6">
                            <Key className="w-3.5 h-3.5 text-primary" />
                            <span className="font-mono text-xs uppercase tracking-widest text-primary">S3-Compatible</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold font-mono uppercase tracking-tight mb-4">
                            Programmatic API
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Use BeamDrop as an S3 alternative for CI/CD pipelines, development, or artifact storage.
                        </p>
                    </motion.div>

                    <motion.div
                        className="space-y-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeUp} custom={1}>
                            <CodeBlock title="Create a bucket & upload">
                                {`# Create bucket\ncurl -X PUT http://localhost:8080/api/v1/buckets/my-bucket \\\n  -H "Authorization: Bearer \${KEY}:\${SIG}" \\\n  -H "X-Beamdrop-Date: \${TS}"\n\n# Upload file\ncurl -X PUT http://localhost:8080/api/v1/buckets/my-bucket/file.txt \\\n  -H "Authorization: Bearer \${KEY}:\${SIG}" \\\n  -H "X-Beamdrop-Date: \${TS}" \\\n  -H "Content-Type: text/plain" \\\n  -d "Hello, World!"`}
                            </CodeBlock>
                        </motion.div>

                        <motion.div variants={fadeUp} custom={2}>
                            <CodeBlock title="Shareable links API">
                                {`# Create a shareable link with password & expiry\ncurl -X POST http://localhost:8080/api/shares \\\n  -H "Content-Type: application/json" \\\n  -d '{"path": "/docs/report.pdf", "password": "secret", "expiresIn": 72}'\n\n# Access shared file\ncurl http://localhost:8080/share/<token>`}
                            </CodeBlock>
                        </motion.div>
                    </motion.div>

                    <div className="mt-10 text-center">
                        <Link to="/docs/api">
                            <Button variant="outline" className="gap-2 font-mono uppercase tracking-wide text-xs">
                                Full API Documentation <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Architecture */}
            <section className="py-24 px-4 border-t border-border/50">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={0}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold font-mono uppercase tracking-tight mb-4">
                            Project Structure
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={1}
                    >
                        <CodeBlock title="Storage layout">
                            {`shared-directory/\n├── buckets/              # API-managed storage\n│   ├── my-bucket/\n│   │   ├── images/\n│   │   │   └── photo.jpg\n│   │   └── data.json\n│   └── backups/\n│       └── db.sql\n├── .beamdrop/            # Logs\n│   └── beamdrop.log      # Structured JSON log file\n├── .beamdrop_data/       # Internal database\n└── .beamdrop_trash/      # Deleted files (recoverable)`}
                        </CodeBlock>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4 border-t border-border/50">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold font-mono uppercase tracking-tight mb-4"
                        variants={fadeUp}
                        custom={0}
                    >
                        Ready to drop some files?
                    </motion.h2>
                    <motion.p className="text-muted-foreground mb-8" variants={fadeUp} custom={1}>
                        One binary. No dependencies. Your files, your server.
                    </motion.p>
                    <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" variants={fadeUp} custom={2}>
                        <Link to="/docs/installation">
                            <Button size="lg" className="gap-2 font-mono uppercase tracking-wide text-sm px-8 h-12">
                                <Terminal className="w-4 h-4" />
                                Get Started
                            </Button>
                        </Link>
                        <a href="https://github.com/ekilie/beamdrop" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg" className="gap-2 font-mono uppercase tracking-wide text-sm px-8 h-12">
                                Star on GitHub
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
