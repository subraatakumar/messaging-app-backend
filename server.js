const express = require("express");
const WebSocket = require("ws");

const app = express();
const port = process.env.PORT || 3000; // Use PORT from environment or default to 3000

// Create an HTTP server and bind the WebSocket server to it
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on("connection", (ws) => {
  console.log("A new user connected");

  ws.on("message", (message) => {
    console.log("Received:", message);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("User disconnected");
  });
});
