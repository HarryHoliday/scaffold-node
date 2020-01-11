import http from 'http';

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("I'm good!");
});

server.listen(port, () => {
  console.log(`Available health check at http://${hostname}:${port}/`);
});
