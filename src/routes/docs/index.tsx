import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
    Download, Shield, Terminal, Container, BarChart3, Share2,
    Key, FolderTree, ArrowRight, BookOpen, Server
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/docs/")({
    component: DocsIndex,
});

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
    }),
};

const sections = [
    {
        icon: Download,
        title: "Installation",
        desc: "Install from source, download binaries, or run with Docker.",
        to: "/docs/installation",
    },
    {
        icon: Terminal,
        title: "Quick Start",
        desc: "Get up and running in seconds with basic CLI usage.",
        to: "/docs/quickstart",
    },
    {
        icon: Shield,
        title: "Configuration",
        desc: "CLI flags, environment variables, and Docker Compose setup.",
        to: "/docs/configuration",
    },
    {
        icon: Key,
        title: "API Reference",
        desc: "S3-compatible API with HMAC-SHA256 authentication.",
        to: "/docs/api",
    },
    {
        icon: Share2,
        title: "Shareable Links",
        desc: "Create password-protected shareable links with expiry.",
        to: "/docs/shares",
    },
    {
        icon: Container,
        title: "Docker & Deployment",
        desc: "Docker, Docker Compose, Caddy reverse proxy, and production tips.",
        to: "/docs/docker",
    },
    {
        icon: BarChart3,
        title: "Monitoring",
        desc: "Prometheus metrics, Grafana dashboard, and health probes.",
        to: "/docs/monitoring",
    },
    {
        icon: FolderTree,
        title: "Architecture",
        desc: "Project structure, storage layout, and development guide.",
        to: "/docs/architecture",
    },
];

function DocsIndex() {
    return (
        <div className="overflow-x-hidden">
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={0}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-6">
                            <BookOpen className="w-3.5 h-3.5 text-primary" />
                            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                Documentation
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold font-mono uppercase tracking-tight mb-4">
                            Beam<span className="text-primary">Drop</span> Docs
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Everything you need to install, configure, and integrate BeamDrop
                            into your workflow.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {sections.map((s, i) => (
                            <motion.div key={s.title} variants={fadeUp} custom={i}>
                                <Link to={s.to}>
                                    <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors group cursor-pointer">
                                        <CardContent className="p-6 flex gap-4">
                                            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <s.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-mono text-sm font-bold uppercase tracking-wide mb-1 flex items-center gap-2">
                                                    {s.title}
                                                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {s.desc}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
