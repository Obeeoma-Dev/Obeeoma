const Footer = () => {
  const footerSections = [
    {
      title: "About Obeeoma",
      links: [
        "Why we started and our goals",
        "Insights on the future of mental healthcare",
        "Info on our privacy and how we secure user information",
      ],
    },
    {
      title: "For Employers",
      links: ["How it works", "Pricing", "Partners", "Get Started"],
    },
    {
      title: "For Employees",
      links: ["Sign in", "Privacy Policy", "Terms of Use", "Get Connected"],
    },
    {
      title: "Company",
      links: ["About us", "Blog", "Careers", "Contact"],
    },
  ];

  return (
    <footer className="bg-muted py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-primary mb-4">Obeeoma</h2>
            <p className="text-sm text-muted-foreground mb-4">
              We're dedicated to democratizing access to mental health resources.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 Obeeoma. All Rights Reserved.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Obeeoma. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;