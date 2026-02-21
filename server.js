import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({port : 8080});

// 0: CONNECTING
// 1: OPEN(The only state where we can safely use send())
// 2: CLOSING
// 3: CLOSED

//connection event - this 'on' is fired once the handshake is verified
wss.on("connection", (socket, request) => {
    const ip = request.socket.remoteAddress;
    console.log(`🚀 New Tunnel Open: ${ip}`);

    socket.on("message", (rawData) => {
        const message = rawData.toString();
        console.log(`📩 Received: ${message}`);

        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(`Server Broadcast: ${message}`);
            }
        });
    });

    socket.on("close", () => console.log("👋 Client disconnected."));
});

console.log("WebSocket Server is live on ws://localhost:8080");
