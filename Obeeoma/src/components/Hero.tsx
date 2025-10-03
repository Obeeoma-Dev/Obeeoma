import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/images/headerimage.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      role="region"
      className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        data-testid="hero-background"
      >
        <div className="absolute inset-0" style={{ background: 'var(--hero-gradient)' }} />
      </div>


      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
          Start Your journey to<br className="hidden sm:block" />better mental health
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
          Obeeoma provides comprehensive mental health services with a personalized approach to help you achieve emotional well-being and resilience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
          <Button
            variant="hero"
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
            onClick={() => navigate("/employer-dashboard")}
          >
            Sign up for my organization
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6">
            Sign In
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-background/90 backdrop-blur-sm">
            Mental Health Assessments
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-background/90 backdrop-blur-sm">
            Skills Learning
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-background/90 backdrop-blur-sm">
            Feedback
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-background/90 backdrop-blur-sm">
            EAP
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default Hero;