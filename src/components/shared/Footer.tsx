import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer
      className="text-light py-5 mt-5"
      style={{ background: "linear-gradient(135deg, #3CB371, #00A859)" }}
    >
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4">
            <h4 className="fw-bold mb-3">Obeeoma</h4>
            <p className="small opacity-75">
              Empowering mental wellness in Africa by connecting employers and
              employees with tailored mental health solutions.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="fw-semibold mb-3">Company</h6>
            <ul className="list-unstyled small">
              <li>
                <a
                  href="#about"
                  className="text-white text-decoration-none opacity-75"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-white text-decoration-none opacity-75"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-white text-decoration-none opacity-75"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white text-decoration-none opacity-75"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h6 className="fw-semibold mb-3">Employers</h6>
            <ul className="list-unstyled small">
              <li>
                <a
                  href="#features"
                  className="text-white text-decoration-none opacity-75"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-white text-decoration-none opacity-75"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#partners"
                  className="text-white text-decoration-none opacity-75"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="text-white text-decoration-none opacity-75"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6 className="fw-semibold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-white fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white fs-5">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-white fs-5">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4 border-light opacity-25" />
        <div className="text-center small opacity-75">
          <p className="small mb-0 opacity-75">
            Built with ❤️ for wellbeing and purpose. | © 2025 Obeeoma. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
