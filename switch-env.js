#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envLocalPath = path.join(__dirname, '.env.local');

// Read current .env.local
const currentContent = fs.readFileSync(envLocalPath, 'utf8');

// Check command line argument
const env = process.argv[2];

if (env === 'local') {
  // Set to local development
  const localContent = `# Local development API URL
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1/
# Production API URL (commented out)
# VITE_API_BASE_URL=http://64.225.122.101:8000/api/v1/
`;
  fs.writeFileSync(envLocalPath, localContent);
  console.log('✅ Switched to LOCAL development environment');
  console.log('📍 API URL: http://127.0.0.1:8000/api/v1/');
} else if (env === 'prod') {
  // Set to production
  const prodContent = `# Production API URL
VITE_API_BASE_URL=http://64.225.122.101:8000/api/v1/
# Local development (commented out)
# VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1/
`;
  fs.writeFileSync(envLocalPath, prodContent);
  console.log('✅ Switched to PRODUCTION environment');
  console.log('📍 API URL: http://64.225.122.101:8000/api/v1/');
} else {
  console.log('❌ Please specify environment:');
  console.log('   node switch-env.js local   - Switch to local development');
  console.log('   node switch-env.js prod    - Switch to production');
  console.log('');
  console.log('Current configuration:');
  console.log(currentContent);
}
