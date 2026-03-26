import Portfolio from "./pages/Portfolio";
import { TooltipProvider } from "./components/ui/tooltip";
import { ToastProvider, ToastViewport } from "./components/ui/toast";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <TooltipProvider>
      <ToastProvider>
        <Portfolio />
        <Toaster />
        <ToastViewport />
      </ToastProvider>
    </TooltipProvider>
  );
}

export default App;
