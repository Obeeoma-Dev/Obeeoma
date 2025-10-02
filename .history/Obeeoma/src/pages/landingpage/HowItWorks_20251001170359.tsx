import { Building2, Users, BarChart3 } from "lucide-react";
import happyPersonImage from "@/assets/Images/professional-worker.png";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      icon: Building2,
      title: "Sign up your company",
      description: "Register your organization - it's fast",
    },
    {
      number: "2",
      icon: Users,
      title: "Invite Employees",
      description: "Send invitations to your team members to access mental health support",
    },
    {
      number: "3",
      icon: BarChart3,
      title: "Track Anonymized Insights",
      description: "Keep tabs on usage, monitor progress, and gain high-level insights into wellbeing trends across your teams",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How it works for Employers</h2>
          <p className="text-xl text-muted-foreground">3 simple steps</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <img 
              src={happyPersonImage} 
              alt="Happy person" 
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;