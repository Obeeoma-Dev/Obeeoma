const fs = require('fs');
const dotenv = require('dotenv');
const parsed = dotenv.parse(fs.readFileSync('.env', 'utf-8'));
console.log(parsed.VITE_API_BASE_URL);
