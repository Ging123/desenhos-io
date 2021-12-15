require('dotenv').config(); 
import connectToMoongo from './src/configs/moongose';
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 8000;

//MIDDLEWARES
app.use(cors({
  origin:process.env.CLIENT_URL!
}));
app.use(bodyParser.json());
app.use(routes);

//SOCKETS
require('./src/services/chat/Index')(io);

//METHOD TO CONFIG ALL THINGS BEFORE START THE SERVER
!(async function config() {
  try {
    await connectToMoongo();
    server.listen(port, () => console.log(`The server start in the port ${port}`));
  }
  catch(err:unknown) {
    console.log(err);
  }
})();