import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Obeeoma Privacy Policy</h1>
      <p className="text-gray-600 mb-8">Effective Date: November 2025</p>

      <div className="space-y-6">
        <section>
          <p className="mb-4">
            At Obeeoma, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard the information you share with us when you use the Obeeoma app, website, or related services ("the Platform"). By using our services, you consent to the practices described below.
          </p>
        </section>

        <section>
          <p className="mb-4">
            We collect personal information such as your name, contact details, and demographic information when you register on the platform. We also collect non-personal data, such as device information, app usage patterns, and analytics to help improve our services. If you book therapy sessions, additional information relevant to your well-being may be collected for the purpose of connecting you to the right professional.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Your personal information is used to provide and improve our services, process payments, verify user identity, and communicate updates or offers. Sensitive information shared during therapy sessions is kept strictly confidential and is only accessible to your assigned therapist, except where disclosure is required by law or safety concerns.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Obeeoma uses secure third-party payment gateways (e.g., Paystack, Flutterwave) and does not store your payment card information. All user data is encrypted and stored securely to prevent unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section>
          <p className="mb-4">
            We may share limited information with trusted partners or service providers who help operate our platform, such as hosting services, analytics tools, and payment processors. These third parties are bound by confidentiality and data protection agreements.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Obeeoma does not sell or rent user data to advertisers or external organizations. However, we may share aggregated, non-identifiable statistics for research and service improvement purposes.
          </p>
        </section>

        <section>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal data at any time. You can also withdraw consent for data processing by contacting us through the support email below. Please note that withdrawing consent may limit your ability to use certain platform features.
          </p>
        </section>

        <section>
          <p className="mb-4">
            Our platform may contain links to third-party websites. We are not responsible for their privacy practices, and we encourage you to read their privacy policies separately.
          </p>
        </section>

        <section>
          <p className="mb-4">
            We may update this Privacy Policy periodically. When we make significant changes, we will notify you through the app or via email. Continued use of Obeeoma after updates means you accept the revised policy.
          </p>
        </section>

        <section className="mt-8">
          <p className="font-semibold">For privacy-related inquiries, contact us at:</p>
          <p><a href="mailto:hello@obeeoma.com" className="text-blue-600 hover:underline">hello@obeeoma.com</a></p>
          <p><a href="https://www.obeeoma.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.obeeoma.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;