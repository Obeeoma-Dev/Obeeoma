import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Obeeoma from "../../assets/Images/obeeomalogoword1.png";

// Define interface for menu items
interface MenuSection {
  title: string;
  items: Array<{ text: string; link: string }>;
}

const Footer: React.FC = () => {
  // Define footer sections and their items
  const menuSections: Record<string, MenuSection> = {
    forEmployers: {
      title: "For Employers",
      items: [
        { text: "How it works", link: "/how-it-works" },
        { text: "Pricing", link: "/pricing" },
        { text: "Partners", link: "/partners" },
        { text: "Case Studies", link: "/case-studies" },
      ],
    },
    forEmployees: {
      title: "For Employees",
      items: [
        { text: "Sign in", link: "/signin" },
        { text: "Privacy Policy", link: "/privacy" },
        { text: "Support", link: "/support" },
        { text: "Crisis Resources", link: "/crisis-resources" },
      ],
    },
    company: {
      title: "Company",
      items: [
        { text: "About us", link: "/about" },
        { text: "Blog", link: "/blog" },
        { text: "Careers", link: "/careers" },
        { text: "Contact", link: "/contact" },
      ],
    },
  };

  return (
    <footer className="bg-light py-5" data-testid="footer">
      <div className="container">
        {/* Logo Row */}
        <div className="row mb-4">
          <div className="col-12">
            <img
              src={Obeeoma}
              alt="Obeeoma"
              className="mb-2"
              style={{
                height: "40px",
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
            <h6 className="text-dark mb-3" style={{ fontFamily: 'heading' }}>About Obeeoma</h6>
            <p className="text-muted small mb-4">
              AI-first workplace mental health platform built for Africa. Supporting
              healthier, more productive teams across the continent.
            </p>
            <p className="text-muted small mb-0">
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
              <h6 className="text-dark mb-3" style={{ fontFamily: 'heading' }}>{section.title}</h6>
              <ul className="list-unstyled">
                {section.items.map((item, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      to={item.link}
                      className="text-muted text-decoration-none"
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