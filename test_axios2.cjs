const axios = require('axios');
const api1 = axios.create({ baseURL: 'http://64.225.122.101/api/v1' });
const api2 = axios.create({ baseURL: 'http://64.225.122.101/api/v1/' });
console.log('Without trailing slash in baseURL:');
console.log(api1.getUri({ url: '/auth/invitations/' }));
console.log('With trailing slash in baseURL:');
console.log(api2.getUri({ url: '/auth/invitations/' }));
