import React from "react";

// 1. Interface definition for required props
// We MUST extend React.HTMLAttributes<HTMLElement> or React.HTMLAttributes<HTMLSectionElement>
// to allow standard attributes like 'className' and the spread 'rest' to be used without TypeScript errors.
// Using HTMLSectionElement is the most precise type here.
export interface AppDownloadSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  googlePlayLink: string;
  appStoreLink: string;
  mainImageUrl: string;
  googlePlayButtonUrl: string;
  appStoreButtonUrl: string;
}

// 2. The Functional Component (FC) that consumes the props
const AppDownloadSection: React.FC<AppDownloadSectionProps> = ({
  googlePlayLink,
  appStoreLink,
  mainImageUrl,
  googlePlayButtonUrl,
  appStoreButtonUrl,
  // Explicitly extract the standard attributes: className and capture the rest
  className,
  ...rest // This captures all remaining props, which are now correctly typed as HTML attributes
}) => {
  return (
    // Apply the passed 'className' along with the component's default class
    // Use a template string (backticks) to combine classes, and spread the 'rest' attributes
    <section className={`container py-5 ${className || ""}`} {...rest}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 text-center">
          <header className="mb-4">
            <h1 className="display-4 fw-normal">
              Your Mental Wellness,{" "}
              <span className="custom-green-text fw-bold">Our Priority</span>
            </h1>
          </header>

          <div className="mb-5 mx-auto" style={{ maxWidth: "450px" }}>
            <img
              src={mainImageUrl} // <-- Uses prop for the main image
              alt="Screenshot of the Obeeoma employee app"
              className="img-fluid"
              style={{ maxHeight: "450px", width: "auto" }}
            />
          </div>

          <p className="lead text-secondary mb-4">
            Download the Obeeoma app and take the first step towards a
            healthier, happier workplace.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {/* Google Play Button Link */}
            <a
              href={googlePlayLink}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-block"
            >
              <img
                src={googlePlayButtonUrl} // <-- Uses prop for the button image
                alt="Get it on Google Play"
                className="img-fluid"
                style={{ height: "60px", width: "auto" }}
              />
            </a>

            {/* App Store Button Link */}
            <a
              href={appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-block"
            >
              <img
                src={appStoreButtonUrl} // <-- Uses prop for the button image
                alt="Download on the App Store"
                className="img-fluid"
                style={{ height: "60px", width: "auto" }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
