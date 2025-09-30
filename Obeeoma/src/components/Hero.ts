import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/Images/headerimage.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0" style={{ background: 'var(--hero-gradient)' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          Start Your journey to<br />better mental health
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto">
          Obeeoma provides comprehensive mental health services with a personalized approach to help you achieve emotional well-being and resilience.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Get started for your organization
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
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