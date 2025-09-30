import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <h1 className="text-2xl font-bold text-primary">Obeeoma</h1>
          <div className="hidden md:flex items-center gap-8">
            <a href="#learn" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Resources
            </a>
            <a href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#benefits" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Benefits
            </a>
          </div>
        </div>
        <Button variant="hero" size="lg">
          Create Account
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;