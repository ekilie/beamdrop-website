import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SettingsDialog } from "@/components/SettingsDialog";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/context/auth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ShareAccess from "./pages/ShareAccess";
import { ApiKeysPage } from "./components/ApiKeysPage";
import { SharesManagementPage } from "./components/SharesManagementPage";
import { Menu, LogOut, Loader2 } from "lucide-react";

const queryClient = new QueryClient();

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthEnabled, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground font-mono uppercase text-sm">Loading...</p>
        </div>
      </div>
    );
  }


  return <>{children}</>;
}

// Main layout with sidebar and header
function MainLayout() {
  const { isAuthEnabled, logout } = useAuth();

  return (
    

          <main className="flex-1 overflow-y-auto scrollbar-thin">
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </main>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="beamdrop-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Public route for share access - no auth required */}
                <Route path="/share/:token" element={<ShareAccess />} />
                
                {/* Protected routes */}
                <Route path="*" element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                } />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
