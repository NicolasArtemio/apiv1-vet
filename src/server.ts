import * as http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/v1/usuarios' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ usuarios: [{ id: 1, nombre: 'Juan' }] }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));