#!/usr/bin/env node

// Test script to find correct video URL pattern
const testFile = 'uploads/lil_durk_went_hollywood_for_a_year_h264_10916.mp4';

const urlPatterns = [
  `http://127.0.0.1:8000/media/${testFile}`,
  `http://127.0.0.1:8000/${testFile}`,
  `http://127.0.0.1:8000/uploads/${testFile}`,
  `http://127.0.0.1:8000/api/v1/media/${testFile}`,
  `http://127.0.0.1:8000/api/v1/uploads/${testFile}`,
  `http://127.0.0.1:8000/static/${testFile}`,
  `http://127.0.0.1:8000/static/media/${testFile}`
];

async function testUrls() {
  console.log('Testing video URL patterns...\n');
  
  for (let i = 0; i < urlPatterns.length; i++) {
    const url = urlPatterns[i];
    console.log(`Testing ${i + 1}/${urlPatterns.length}: ${url}`);
    
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        timeout: 5000
      });
      
      const contentType = response.headers.get('content-type');
      const status = response.status;
      
      console.log(`  Status: ${status}`);
      console.log(`  Content-Type: ${contentType}`);
      
      if (response.ok && contentType && contentType.includes('video')) {
        console.log(`WORKING! This URL serves video files correctly\n`);
        console.log(`USE THIS URL PATTERN: ${url.split(testFile)[0]}`);
        return url;
      } else {
        console.log(`Not working\n`);
      }
    } catch (error) {
      console.log(` Error: ${error.message}\n`);
    }
  }
  
  console.log('No working URL pattern found.');
  console.log('\n Check your Django settings.py for:');
  console.log('   MEDIA_URL and STATIC_URL configurations');
  console.log('   Make sure Django development server is running with: python manage.py runserver');
}

testUrls();
