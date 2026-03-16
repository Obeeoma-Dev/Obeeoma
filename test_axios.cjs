const axios = require('axios');
const api = axios.create({ baseURL: 'http://64.225.122.101/api/v1' });
console.log(api.getUri({ url: '/company-mood/dashboard-summary/' }));
console.log(api.getUri({ url: 'company-mood/dashboard-summary/' }));
