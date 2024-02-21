const WebSocket = require('ws');

const startWebSocketServer = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    console.log('Cliente WebSocket conectado');
    ws.on('message', (message) => {
      console.log(`Mensaje WebSocket recibido: ${message}`);
    });
    ws.send('Conexión WebSocket establecida');
  });

  console.log('Servidor WebSocket ejecutándose en el puerto 8080');
};

module.exports = startWebSocketServer;
