import { Card, CardContent } from "@/components/ui/card";
import { Shield, Globe, Sparkles, Heart, Smartphone, BarChart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Anonymous & Secure",
      description: "Built to be a safe and secure space so you can comfortably share what is on your mind without any worry of disclosure",
    },
    {
      icon: Globe,
      title: "Culturally Relevant",
      description: "Designed to suit the beliefs and practices unique with emphasis on cultural sensitivity and respect",
    },
    {
      icon: Sparkles,
      title: "AI Powered Insights",
      description: "Know more about the activities and services that resonate most with you through our data and learning algorithms",
    },
    {
      icon: Heart,
      title: "Team Wellbeing",
      description: "Comprehensive tools designed to support your team's wellbeing and mental health in the workplace",
    },
    {
      icon: Smartphone,
      title: "Responsive Application",
      description: "Optimized to work seamlessly on any device so you can access your mental health support from anywhere",
    },
    {
      icon: BarChart,
      title: "ROI Analytics",
      description: "Get meaningful metrics showing you the impact of your mental health programs on your organization's performance",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Comprehensive Obeeoma Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to support mental health and wellness in one platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;