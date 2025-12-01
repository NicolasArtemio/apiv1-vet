import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificacionesGateway {
  @WebSocketServer()
  server: Server;

  private normalizarUsuarioId(
    raw: string | string[] | undefined,
  ): string | null {
    if (!raw) return null;
    return Array.isArray(raw) ? raw[0] : raw;
  }

  handleConnection(socket: Socket) {
    const usuarioId = this.normalizarUsuarioId(
      socket.handshake.query.usuarioId,
    );

    if (!usuarioId) {
      console.log('Conexión rechazada: falta usuarioId');
      void socket.disconnect(); // FIX
      return;
    }

    socket.join(`usuario_${usuarioId}`);
    console.log(`🟢 Usuario ${usuarioId} conectado`);
  }

  handleDisconnect(socket: Socket) {
    const usuarioId = this.normalizarUsuarioId(
      socket.handshake.query.usuarioId,
    );

    if (usuarioId) {
      console.log(`🔴 Usuario ${usuarioId} desconectado`);
      socket.leave(`usuario_${usuarioId}`);
    }
  }

  enviarNotificacionAUsuario(usuarioId: string, payload: any) {
    this.server.to(`usuario_${usuarioId}`).emit('notificacion', payload);
  }

  enviarNotificacionGlobal(payload: any) {
    this.server.emit('notificacion_global', payload);
  }

  @SubscribeMessage('nuevo_mensaje')
  handleNuevoMensaje(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const usuarioId = this.normalizarUsuarioId(
      socket.handshake.query.usuarioId,
    );
    console.log(`Mensaje recibido de usuario ${usuarioId}:`, data);

    return { ok: true };
  }
}
