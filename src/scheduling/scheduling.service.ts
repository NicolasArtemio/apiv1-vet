// src/scheduling/scheduling.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
// Asume que necesitas el NotificacionesService para el callback
// Asegúrate de que la ruta de importación sea correcta.

@Injectable()
export class SchedulingService {
  private readonly logger = new Logger(SchedulingService.name);

  // Usamos un Map para almacenar las referencias a los timeouts.
  // Esto permite cancelar tareas si un turno se modifica o elimina.
  private scheduledTasks = new Map<string, NodeJS.Timeout>();

  constructor(
    // Inyectamos el servicio de notificaciones para demostrar que se puede
    // usar dentro del callback si fuese necesario, aunque el TurnosService
    // pasa un callback que ya lo contiene.
    private readonly notificacionesService: NotificacionesService,
  ) {}

  /**
   * Programa una función asíncrona para que se ejecute en una fecha/hora específica.
   * * @param id ID único de la tarea (ej: 'recordatorio-turno-123')
   * @param date Fecha y hora en que debe ejecutarse la tarea (Date object).
   * @param callback La función asíncrona a ejecutar (que en tu caso llama a createNotificacion).
   */
  scheduleTask(id: string, date: Date, callback: () => Promise<void>): void {
    const delayInMilliseconds = date.getTime() - Date.now();

    // Verificación de seguridad: si la fecha ya pasó o es inmediata, no programamos.
    if (delayInMilliseconds <= 0) {
      this.logger.warn(
        `Turno ${id} ya está en el pasado o es inmediato. No se programa recordatorio.`,
      );
      return;
    }

    // Definimos la tarea usando una función SÍNCRONA para setTimeout.
    // Esto resuelve el error de Promise de TypeScript (no-misused-promises).
    const timeout = setTimeout(() => {
      this.logger.log(`Ejecutando recordatorio programado para: ${id}`);

      // Ejecutamos el callback asíncrono y gestionamos la promesa
      callback()
        .then(() => {
          this.scheduledTasks.delete(id); // Limpiar al finalizar con éxito
        })
        .catch((error) => {
          // Manejo de errores seguro para el stack
          let stackTrace = 'No stack available';
          if (error instanceof Error) {
            stackTrace = error.stack ?? error.message;
          }

          this.logger.error(
            `🛑 Error al ejecutar recordatorio para ${id}`,
            stackTrace,
          );
          this.scheduledTasks.delete(id); // Limpiar incluso si falló
        });
    }, delayInMilliseconds);

    // Almacena la referencia y registra
    this.scheduledTasks.set(id, timeout);
    this.logger.log(
      `Recordatorio ${id} programado para: ${date.toLocaleString()}`,
    );
  }

  /**
   * (Opcional) Permite cancelar una tarea programada si el turno es modificado o cancelado.
   */
  cancelTask(id: string): void {
    const timeout = this.scheduledTasks.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.scheduledTasks.delete(id);
      this.logger.log(`Recordatorio ${id} cancelado.`);
    }
  }
}
