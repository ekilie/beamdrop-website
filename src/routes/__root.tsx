import { createRootRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import Footer from '@/components/Footer'
import { Book, Github, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
    component: RootLayout,
})

function RootLayout() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const routerState = useRouterState()
    const currentPath = routerState.location.pathname

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/docs', label: 'Docs' },
        { to: '/docs/installation', label: 'Install' },
        { to: '/docs/api', label: 'API' },
    ]

    return (
        <ThemeProvider defaultTheme="system" storageKey="beamdrop-ui-theme">
            <div className="min-h-screen bg-background text-foreground flex flex-col">
                {/* Navigation */}
                <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
                    <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
                        <Link to="/" className="flex items-center gap-2 font-mono font-bold text-lg uppercase tracking-tight">
                            Beam<span className="text-primary">Drop</span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider transition-colors ${currentPath === link.to
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="w-px h-5 bg-border mx-2" />
                            <a
                                href="https://github.com/ekilie/beamdrop"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <ThemeToggle />
                        </nav>

                        {/* Mobile menu button */}
                        <div className="flex items-center gap-2 md:hidden">
                            <ThemeToggle />
                            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={() => setMobileOpen(!mobileOpen)}>
                                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile nav */}
                    {mobileOpen && (
                        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
                            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setMobileOpen(false)}
                                        className={`px-3 py-2 rounded-md font-mono text-xs uppercase tracking-wider transition-colors ${currentPath === link.to
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <a
                                    href="https://github.com/ekilie/beamdrop"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-2 rounded-md font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center gap-2"
                                >
                                    <Github className="w-4 h-4" /> GitHub
                                </a>
                            </nav>
                        </div>
                    )}
                </header>

                {/* Page content */}
                <main className="flex-1">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </ThemeProvider>
    )
}
