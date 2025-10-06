import { Button } from "@/components/ui/button";
import logo from '../../assets/Images/obeeomalogoicon2.png';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <img src={logo} alt="Obeeoma Logo" className="h-8 w-auto" />
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#learn"
              className="text-sm font-medium text-white hover:text-[#3CB371] transition-colors"
            >
              Resources
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-white hover:text-[#3CB371] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#benefits"
              className="text-sm font-medium text-white hover:text-[#3CB371] transition-colors"
            >
              Benefits
            </a>
          </div>
        </div>
        <Button 
        variant="hero"        
         className="bg-gradient-to-r from-green-500 to-red-500 hover:from-green-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        size="lg">
          Create Account
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;