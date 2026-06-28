import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SimulationProvider } from "./contexts/SimulationContext";
import SimulationApp from "./components/SimulationApp";
import LandingPage from "./components/LandingPage";
import LoginModal from "./components/LoginModal";

function AppContent() {
  const { isAuthenticated, isLoading, startOnboarding } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage 
          onGetStarted={startOnboarding}
          onLogin={() => setShowLoginModal(true)}
        />
        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </>
    );
  }

  return (
    <SimulationProvider>
      <SimulationApp />
    </SimulationProvider>
  );
}

function VersionBadge() {
  return (
    <div
      className="fixed bottom-2 right-2 z-50 select-none rounded-full bg-muted/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-sm pointer-events-none"
      data-testid="version-badge"
    >
      v{__APP_VERSION__}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
        <Toaster />
        <VersionBadge />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;