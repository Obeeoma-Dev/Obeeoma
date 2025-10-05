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
    <footer className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-300 py-16 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-white mb-4">Obeeoma</h2>
            <p className="text-sm mb-4">
              We're dedicated to democratizing access to mental health resources.
            </p>
            <p className="text-xs opacity-70">
              © 2025 Obeeoma. All Rights Reserved.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="/employer-dashboard"
                      className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 Obeeoma. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
