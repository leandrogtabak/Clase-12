const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

const messages = [
  // { author: 'Juan', text: '¡Hola! ¿Que tal?' },
  // { author: 'Pedro', text: '¡Muy bien! ¿Y vos?' },
  // { author: 'Ana', text: '¡Genial!' },
];

httpServer.listen(8080, function () {
  console.log('Servidor corriendo en http://localhost:8080');
});

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  socket.emit('messages', messages);

  socket.on('new-message', (data) => {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});
