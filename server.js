const http = require('http');
const app = require('./app');

const port = 3000;
const server = http.createServer(app);
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log('server started...');
});
