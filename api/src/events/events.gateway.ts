import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: 'http://localhost:5173', credentials: true },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Client joins their own room using their userId
  @SubscribeMessage('join')
  handleJoin(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    client.join(`user:${userId}`);
    client.join('admin'); // all clients join admin room too
    return { event: 'joined', data: userId };
  }

  // Called by PaymentsService after a repayment
  emitPaymentUpdate(userId: string, loanId: string, payload: any) {
    // Notify the specific user
    this.server
      .to(`user:${userId}`)
      .emit('payment:updated', { loanId, ...payload });
    // Notify all admins
    this.server
      .to('admin')
      .emit('admin:loan:updated', { loanId, userId, ...payload });
  }

  // Called by LoansService after status change
  emitLoanStatusUpdate(userId: string, loanId: string, status: string) {
    this.server
      .to(`user:${userId}`)
      .emit('loan:status:updated', { loanId, status });
    this.server.to('admin').emit('admin:loan:updated', { loanId, status });
  }
}
