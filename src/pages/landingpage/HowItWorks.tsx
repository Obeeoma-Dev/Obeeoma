import React from "react";
import { Building2, Users, BarChart3 } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import happyPersonImage from "../../assets/Images/professional-worker.png";

const HowItWorks = () => {
  const steps = [
    { icon: Building2, title: "Register Your Company", desc: "Get started in minutes and set up your workplace hub." },
    { icon: Users, title: "Invite Employees", desc: "Give your team instant access to mental health tools." },
    { icon: BarChart3, title: "Track Progress", desc: "View insights and see how your people are improving." },
  ];

  return (
    <section className="section-bg-dark text-white py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">How It Works</h2>
          <p className="text-light opacity-75">Three simple steps to start empowering wellbeing at work</p>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src={happyPersonImage} alt="Happy worker" className="img-fluid rounded-4 shadow-lg" />
          </div>
          <div className="col-md-6">
            {steps.map((s, i) => (
              <div key={i} className="d-flex align-items-start mb-4">
                <div className="me-3 p-3 rounded-circle bg-light text-success">
                  <s.icon size={24} />
                </div>
                <div>
                  <h5 className="fw-semibold">{s.title}</h5>
                  <p className="text-light opacity-75 mb-0">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
