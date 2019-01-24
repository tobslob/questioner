import http from 'http';
import app from './app';

const server = http.createServer(app);

server.listen(3000, () => {
  /* eslint-disable no-console */
  console.log('server started...');
});
