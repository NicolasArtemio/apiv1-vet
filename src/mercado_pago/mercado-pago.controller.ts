import { Controller, Post, Body, Res, HttpStatus, Query } from '@nestjs/common';
import { Response } from 'express';
import { MercadoPagoService } from './mercado-pago.service';
import { CreatePreferenceDto } from './dto/preference-dto';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mpService: MercadoPagoService) {}

  @Post('create-order')
  async createOrder(@Body() body: CreatePreferenceDto, @Res() res: Response) {
    try {
      const response = await this.mpService.createPreference(body);
      return res.status(HttpStatus.CREATED).json(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error desconocido' });
    }
  }

  @Post('webhook')
  handleWebhook(
    @Query() query: { topic?: string; type?: string; 'data.id'?: string },
    @Res() res: Response,
  ) {
    const topic = query.topic ?? query.type;

    console.log('Notificación recibida:', query);

    try {
      if (topic === 'payment') {
        const paymentId = query['data.id'];

        console.log('Pago recibido con ID:', paymentId);

        // await this.mpService.checkPaymentStatus(paymentId);
      }

      return res.status(HttpStatus.OK).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
