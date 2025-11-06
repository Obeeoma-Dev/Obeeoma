import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Obeeoma from "../../assets/Images/obeeomalogoword2.png";

// Define interface for menu items
interface MenuSection {
  title: string;
  items: Array<{ text: string; link: string }>;
}

const Footer: React.FC = () => {
  // Define footer sections and their items
  const menuSections: Record<string, MenuSection> = {
    services: {
      title: "Services",
      items: [
        { text: "For Organizations", link: "/organizations" },
        { text: "For Employees", link: "/employees" },
        { text: "Mental Health Assessments", link: "/assessments" },

      ],
    },
    company: {
      title: "Company",
      items: [
        { text: "About Us", link: "/about" },
        { text: "Careers", link: "/careers" },
        { text: "Blog", link: "/blog" },
        { text: "Contact", link: "/contact" },
      ],
    },
    legal: {
      title: "Legal",
      items: [
        { text: "Privacy Policy", link: "/privacy" },
        { text: "Terms of Service", link: "/terms" },
        { text: "Cookie Policy", link: "/cookies" },
        { text: "HIPAA Compliance", link: "/hipaa" },
      ],
    },
  };

  return (
    <footer className="py-5" data-testid="footer">
      <div className="container">
        {/* Logo Row */}
        <div className="row mb-4">
          <div className="col-12">
            <img
              src={Obeeoma}
              alt="Obeeoma"
              className="mb-2"
              style={{
                height: "50px",
                width: "auto",
              }}
              data-testid="footer-logo"
            />
          </div>
        </div>

        {/* Content Row */}
        <div className="row">
          {/* About Section */}
          <div className="col-lg-3 mb-4" data-testid="footer-section-about">
            <h6 className="text-white mb-3" style={{ fontFamily: 'heading' }}>About Obeeoma</h6>
            <p className="text-white small mb-4">
              AI-first workplace mental health platform built for Africa. Supporting
              healthier, more productive teams across the continent.
            </p>
            <p className="text-white small mb-0">
              © 2025 Obeeoma. All rights reserved.
            </p>
          </div>

          {/* Menu Sections */}
          {Object.entries(menuSections).map(([key, section]) => (
            <div
              key={key}
              className="col-lg-3 mb-4"
              data-testid={`footer-section-${key}`}
            >
              <h6 className="text-white mb-3" style={{ fontFamily: 'heading' }}>{section.title}</h6>
              <ul className="list-unstyled">
                {section.items.map((item, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      to={item.link}
                      className="text-white text-decoration-none"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;