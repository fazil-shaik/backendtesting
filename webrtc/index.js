import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:8080})

wss.on('connection',(ws)=>{
    console.log('New client connected');

    ws.on('message',(data)=>{
        wss.clients.forEach((client)=>{
            if(client!==ws && client.readyState===WebSocketServer.OPEN){
                client.send(data);
            }
        })
    })

    ws.on('close',()=>{
        console.log('Client disconnected');
    })
})

console.log('WebSocket server is running on ws://localhost:8080');  