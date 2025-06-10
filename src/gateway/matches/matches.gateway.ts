import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Match } from 'src/matches/entities/match.entity';

@WebSocketGateway({ cors: { origin: '*' } })
export class MatchesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MatchesGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinMatch')
  async handleJoinMatch(
    @MessageBody() { matchId }: { matchId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(matchId);
    this.logger.log(`Client ${client.id} joined match ${matchId}`);
    client.emit('joinedRoom', { matchId });
  }

  sendMatchUpdate(match: Match) {
    this.server.to(match.id).emit('matchUpdate', {
      id: match.id,
      status: match.status,
      winner: match.winner.id ?? null,
      player1: {
        id: match.player1.id,
        score: match.player1Score,
      },
      player2: {
        id: match.player2.id,
        score: match.player2Score,
      },
    });
  }
}
