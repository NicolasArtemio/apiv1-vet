// ... imports ...
import {
  Controller,
  Post,
  Body,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // ... (POST /messages/submit sigue igual) ...
  @Post('submit')
  async submitMessage(@Body('text') text: string) {
    const paymentUrl = await this.messageService.createPaymentPreference(text);

    // 1. Aseguramos que la URL exista (como corregimos antes)
    if (!paymentUrl) {
      throw new InternalServerErrorException(
        'No se pudo generar la URL de pago de MP.',
      );
    }

    // 2. Devolvemos la URL como JSON para que React la lea.
    return { redirectUrl: paymentUrl };
  }
  @Get()
  listMessages(): Message[] {
    return this.messageService.listMessages();
  }
}
