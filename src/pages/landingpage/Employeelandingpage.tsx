import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom'; 


type StyleMap = {
  [key: string]: CSSProperties;
};


const styles: StyleMap = {
  // .app-download-container
  appDownloadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    // Background color is assumed to be white/light gray
    backgroundColor: '#ffffff', 
    fontFamily: 'Arial, sans-serif',
    padding: '40px 20px',
    textAlign: 'center',
  },

  // .header-text
  headerText: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#333',
  },

  // .highlighted-text
  highlightedText: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#3CB371', // A shade of green matching the image
    marginBottom: '40px',
  },

  // .image-wrapper (The large green block)
  imageWrapper: {
    width: '100%',
    maxWidth: '600px', // Constrain the image container size
    backgroundColor: '#3CB371', // The prominent green background
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '30px',
    // For a real app, you'd place the man/phone image inside here. 
    // For now, we'll use a placeholder.
    height: '350px', // Placeholder height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // .image-placeholder
  imagePlaceholder: {
      color: 'white',
      fontSize: '20px',
      // This is a stand-in for the complex image, suggesting where it goes.
  },

  // .message
  message: {
    fontSize: '16px',
    color: '#666',
    fontFamily: 'body',
    marginBottom: '40px',
    lineHeight: 1.5,
    maxWidth: '400px',
  },

  // .store-buttons-container
  storeButtonsContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '500px', // To align with the layout in the image
    width: '100%',
  },

  // .store-button
  storeButton: {
    width: '200px', // Approximate size for the button images
    height: '60px',
    // Actual button image should be here. Using a simplified link for structure.
    cursor: 'pointer',
    border: 'none',
    padding: 0,
    backgroundColor: 'transparent',
  },
  
  // .store-button-image
  storeButtonImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain' as 'contain', // CSSProperties requires string literal
  }
};


const AppDownloadPage: React.FC = () => {
  // Included to match the structure of the provided example component, 
  // although not strictly used for navigation on this page.
  const navigate = useNavigate(); 
  
  // Helper for illustrative click handlers
  const handleDownload = (store: 'google' | 'apple') => {
    console.log(`Navigating to ${store} store...`);
    // In a real app, you would redirect to the app store links here
    // window.location.href = store === 'google' ? 'google-play-link' : 'app-store-link';
  };


  return (
    <div style={styles.appDownloadContainer}>
      
      {/* Header Text */}
      <h1 style={styles.headerText}>
        Your Mental Wellness,
      </h1>
      <h1 style={styles.highlightedText}>
        Our Priority
      </h1>

      {/* Image Block (Simulating the man holding the phone) */}
      <div style={styles.imageWrapper}>
         {/* In a real scenario, replace this placeholder with a properly imported Image tag: 
            <img src={ManHoldingPhoneImage} alt="Man holding Obeeoma app on phone" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         */}
         <span style={styles.imagePlaceholder}>
                      </span>
      </div>

      {/* Message Text */}
      <p style={styles.message}>
        Download the Obeeoma app and take the first step towards a healthier, happier workplace
      </p>
      
      {/* App Store Buttons */}
      <div style={styles.storeButtonsContainer}>
          {/* Google Play Button */}
          <button
              style={styles.storeButton}
              onClick={() => handleDownload('google')}
              // Using a placeholder image source for illustrative purposes
          >
              <img 
                  src="google_play_badge_placeholder.png" 
                  alt="Get it on Google Play" 
                  style={styles.storeButtonImage}
              />
              {/* Note: The actual images in the provided design are custom button graphics, 
              not standard badges. This structure places the image where it should go. */}
          </button>
          
          {/* App Store Button */}
          <button
              style={styles.storeButton}
              onClick={() => handleDownload('apple')}
              // Using a placeholder image source for illustrative purposes
          >
              <img 
                  src="app_store_badge_placeholder.png" 
                  alt="Download on the App Store" 
                  style={styles.storeButtonImage}
              />
          </button>
      </div>
      
    </div>
  );
};

export default AppDownloadPage;