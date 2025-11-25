// ... imports ...
import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { Response } from 'express';
import { Message } from './entities/message.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // ... (POST /messages/submit sigue igual) ...
  @Post('submit')
  async submitMessage(@Body('text') text: string, @Res() res: Response) {
    // ... (Lógica de preferencia de pago y redirección 302) ...
    const paymentUrl = await this.messageService.createPaymentPreference(text);
    return res.redirect(paymentUrl);
  }

  // NUEVO: Endpoint para que React obtenga la lista
  @Get()
  listMessages(): Message[] {
    return this.messageService.listMessages();
  }
}
