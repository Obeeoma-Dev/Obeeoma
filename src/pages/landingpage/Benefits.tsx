import {
  FileText,
  Brain,
  Users,
  Calendar,
  TrendingUp,
  Heart,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import image3 from "@/assets/Images/image3.png";
import image4 from "@/assets/Images/alex-green-2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Benefits = () => {
  const benefits: Benefit[] = [
    {
      icon: FileText,
      title: "Know Just One Plan",
      description:
        "Simple, clear and easy-to-understand pricing structure. No hidden fees or unexpected expenses to deal with.",
    },
    {
      icon: Brain,
      title: "Mood Tracking",
      description:
        "Monitor your mental health in a quick-to-use daily diary. Keep an eye on how you feel as time goes by.",
    },
    {
      icon: Users,
      title: "Crisis Support",
      description:
        "Access immediate help. Get the right level of support if you need it, whether it's in the moment or ongoing.",
    },
    {
      icon: Calendar,
      title: "Mood Checking",
      description:
        "Regular check-ins to see how you're doing. Get insights to guide you on your mental wellness journey.",
    },
    {
      icon: TrendingUp,
      title: "Skill Building",
      description:
        "Develop strategies to cope and manage in your situation. Build skills that can enhance your mental strength.",
    },
    {
      icon: Heart,
      title: "Self Assessments",
      description:
        "Regular assessments to track progress and see how your journey is going. Understand yourself better with data.",
    },
    {
      icon: CheckCircle2,
      title: "Complete Portal",
      description:
        "Easy-to-use tools in one place for optimized mental health management. Simple and intuitive interface.",
    },
  ];

  // Divide benefits into rows of 6 cards per side (3x2)
  const half = Math.ceil(benefits.length / 2);
  const firstHalf = benefits.slice(0, half);
  const secondHalf = benefits.slice(half);

  const renderBenefitsGrid = (benefitSet: Benefit[]) => (
    <div className="row g-4">
      {benefitSet.map((benefit, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-sm hover-shadow bg-white rounded-4">
            <div className="card-body text-center p-4">
              <div
                className="d-flex justify-content-center align-items-center bg-success-subtle rounded-circle mb-3"
                style={{ width: "60px", height: "60px", margin: "0 auto" }}>
                <benefit.icon className="text-success fs-4" />
              </div>
              <h5 className="card-title fw-semibold">{benefit.title}</h5>
              <p className="card-text text-muted small">
                {benefit.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section
        className="py-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(230, 255, 237, 0.7) 0%, #ffffff 100%)",
            marginBottom: "0",
}}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-success mb-3">
              Mental Health Care Benefits
            </h2>
            <p
              className="text-muted fs-5 mx-auto"
              style={{ maxWidth: "700px" }}
            >
              Our platform offers a range of benefits designed to support your
              mental health journey.
            </p>
          </div>

          <div className="row align-items-center g-5">
            <div className="col-lg-7">{renderBenefitsGrid(firstHalf)}</div>

            <div className="col-lg-5 text-center">
              <img
                src={image3}
                alt="Professional working"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: "480px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2 (Image on Left) --- */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, rgba(230, 255, 237, 0.7) 100%)",
        }}>
        <div className="container">
          <div className="row align-items-center g-5 flex-lg-row-reverse">
            {/* Image */}
            <div className="col-lg-5 text-center">
              <img
                src={image4}
                alt="Supportive conversation"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: "480px", objectFit: "cover" }}
              />
            </div>

            <div className="col-lg-7">{renderBenefitsGrid(secondHalf)}</div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #00A859 100%)",
          }}
        />
      </section>
    </>
  );
};

export default Benefits;
