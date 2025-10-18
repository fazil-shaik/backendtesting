import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import Connect from './db/dbconnect.js';
import {WebSocketServer} from 'ws'

Connect();
import router from './routes/authroutes.js';
const app = express();
const PORT = 3000;

import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from HTTP server');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.send('Connected via WebSocket');
});

server.listen(8000, () => console.log('Listening on port 8000'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/data',(req,res)=>{
    var data = req.body;
    console.log(data);
    res.send('POST request to the homepage');
})

app.use('/api/auth',router,()=>{console.log("Auth route")});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});