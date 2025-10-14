import { Card, CardContent } from "@/components/ui/card";
import { FileText, Brain, Users, Calendar, TrendingUp, Brain as BrainIcon, Heart, CheckCircle2 } from "lucide-react";
import image3 from "../assets/images/image3.png";


const Services = () => {
  const services = [
    {
      icon: FileText,
      title: "Know Just One Plan",
      description: "Simple, clear and easy-to-understand pricing structure. No hidden fees or unexpected expenses to deal with",
    },
    {
      icon: Brain,
      title: "Mood tracking",
      description: "Monitor your mental health in a quick-to-use daily diary. Keep an eye on how you feel as time goes by",
    },
    {
      icon: Users,
      title: "Crisis Support",
      description: "Access immediate help. Get the right level of support if you need it, whether it's in the moment or ongoing",
    },
    {
      icon: Calendar,
      title: "Mood Checking",
      description: "Regular check-ins to see how you're doing. Get insights to guide you on your mental wellness journey",
    },
    {
      icon: TrendingUp,
      title: "Skill Building",
      description: "Develop strategies to cope and manage in your situation. Build skills that can enhance your mental strength",
    },
    {
      icon: BrainIcon,
      title: "Mood Scheduling",
      description: "Set up activities to support better wellbeing over the course of your day. Plan ahead for better mental health",
    },
    {
      icon: Heart,
      title: "Self Assessments",
      description: "Regular assessments to track progress and see how your journey is going. Understand yourself better with data",
    },
    {
      icon: CheckCircle2,
      title: "Complete Portal",
      description: "Easy-to-use tools in one place for optimized mental health management. Simple and intuitive interface",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Comprehensive Mental Health Care</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform offers a range of services designed to support your mental health journey
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative lg:pl-12">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 transform translate-x-8 translate-y-8"></div>
            <img 
              src={image3} 
              alt="Professional working" 
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;