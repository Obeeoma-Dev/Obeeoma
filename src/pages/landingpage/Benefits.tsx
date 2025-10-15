import {
  FileText,
  Brain,
  Users,
  Calendar,
  TrendingUp,
  Heart,
  CheckCircle2,
} from "lucide-react";
import image3 from "@/assets/Images/image3.png";

const Benefits = () => {
  const benefits = [
    {
      icon: FileText,
      title: "Know Just One Plan",
      description:
        "Simple, clear and easy-to-understand pricing structure. No hidden fees or unexpected expenses to deal with",
    },
    {
      icon: Brain,
      title: "Mood Tracking",
      description:
        "Monitor your mental health in a quick-to-use daily diary. Keep an eye on how you feel as time goes by",
    },
    {
      icon: Users,
      title: "Crisis Support",
      description:
        "Access immediate help. Get the right level of support if you need it, whether it's in the moment or ongoing",
    },
    {
      icon: Calendar,
      title: "Mood Checking",
      description:
        "Regular check-ins to see how you're doing. Get insights to guide you on your mental wellness journey",
    },
    {
      icon: TrendingUp,
      title: "Skill Building",
      description:
        "Develop strategies to cope and manage in your situation. Build skills that can enhance your mental strength",
    },
    {
      icon: Heart,
      title: "Self Assessments",
      description:
        "Regular assessments to track progress and see how your journey is going. Understand yourself better with data",
    },
    {
      icon: CheckCircle2,
      title: "Complete Portal",
      description:
        "Easy-to-use tools in one place for optimized mental health management. Simple and intuitive interface",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-success mb-3">
            Mental Health Care Benefits
          </h2>
          <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "700px" }}>
            Our platform offers a range of benefits designed to support your
            mental health journey
          </p>
        </div>

        {/* Main Row with Grid + Image */}
        <div className="row align-items-center g-5">
          {/* Benefits Grid */}
          <div className="col-lg-7">
            <div className="row g-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                    <div className="card-body text-center p-4">
                      <div
                        className="d-flex justify-content-center align-items-center bg-success-subtle rounded-circle mb-3"
                        style={{
                          width: "60px",
                          height: "60px",
                          margin: "0 auto",
                        }}
                      >
                        <benefit.icon className="text-success fs-4" />
                      </div>
                      <h5 className="card-title fw-semibold">
                        {benefit.title}
                      </h5>
                      <p className="card-text text-muted small">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Image */}
          <div className="col-lg-5 text-center">
            <img
              src={image3}
              alt="Professional working"
              className="img-fluid rounded-4 shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
