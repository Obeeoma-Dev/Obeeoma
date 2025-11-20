import React from 'react';

interface AppDownloadSectionProps {
  googlePlayLink: string;
  appStoreLink: string;
  mainImageUrl: string;
  googlePlayButtonUrl: string;
  appStoreButtonUrl: string;
}

const AppDownloadSection: React.FC<AppDownloadSectionProps> = ({
  googlePlayLink,
  appStoreLink,
  mainImageUrl,
  googlePlayButtonUrl,
  appStoreButtonUrl,
}) => {
  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <header className="mb-4">
            <h1 className="display-4 fw-normal">
              Your Mental Wellness, <span className="custom-green-text fw-bold">Our Priority</span>
            </h1>
          </header>
          <div className="custom-green-bg rounded-4 mb-5 shadow-lg">
            <div className="d-flex justify-content-center align-items-end">
              <img
                src={mainImageUrl}
                alt="Smiling man holding a smartphone with the Obeeoma app logo"
                className="img-fluid"
                style={{ maxHeight: '450px', width: 'auto' }}
              />
            </div>
          </div>
          <p className="lead text-secondary mb-4">
            Download the Obeeoma app and take the first step towards a healthier, happier workplace
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href={googlePlayLink} target="_blank" rel="noopener noreferrer" className="d-inline-block">
              <img
                src={googlePlayButtonUrl}
                alt="Get it on Google Play"
                className="img-fluid"
                style={{ height: '60px', width: 'auto' }}
              />
            </a>
            <a href={appStoreLink} target="_blank" rel="noopener noreferrer" className="d-inline-block">
              <img
                src={appStoreButtonUrl}
                alt="Download on the App Store"
                className="img-fluid"
                style={{ height: '60px', width: 'auto' }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;