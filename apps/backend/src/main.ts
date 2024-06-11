import 'reflect-metadata';
import express, { json } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { ActionRoute } from './routes/action.routes';
import { CreditRoute } from './routes/credit.routes';
import { ActionService } from './services/action.service';
import Container from 'typedi';
import cors from 'cors';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.use(cors())
app.use(json())

// Récupére l'instance du service d'action via TypeDI
const actionService = Container.get(ActionService);
actionService.setSocketServer(io);


app.use(new CreditRoute().router)
app.use(new ActionRoute().router)


server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Envoyer l'état actuel de la file d'attente et des crédits lorsqu'un client se connecte
  socket.emit('updateQueue', actionService.getQueue());
  socket.emit('updateCredits', actionService.getCredits());

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});