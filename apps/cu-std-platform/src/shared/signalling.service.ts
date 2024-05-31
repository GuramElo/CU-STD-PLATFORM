import { Injectable, OnModuleInit } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class WebsocketService implements OnModuleInit {
  private server: WebSocket.Server;

  onModuleInit() {
    this.server = new WebSocket.Server({ port: 8081 }, () => {
      console.log('Signalling server is now listening on port 8081');
    });

    this.server.on('connection', (ws) => {
      console.log(
        `Client connected. Total connected clients: ${this.server.clients.size}`
      );

      ws.on('message', (message) => {
        console.log(message + '\n\n');
        this.broadcast(ws as WebSocket, message as unknown as string);
      });

      ws.on('close', () => {
        console.log(
          `Client disconnected. Total connected clients: ${this.server.clients.size}`
        );
      });

      ws.on('error', (error) => {
        console.log(
          `Client error: ${error}. Total connected clients: ${this.server.clients.size}`
        );
      });
    });
  }

  private broadcast(ws: WebSocket, data: string) {
    this.server.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
}
