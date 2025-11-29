import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { MessageService } from '../message/message.service'; // Asegúrate de que la ruta de importación sea correcta

@Controller('checkout')
@UsePipes(new ValidationPipe({ transform: true })) // Aplica validación y transformación
export class CheckoutController {
  // Inyectamos el servicio que contiene la lógica de Mercado Pago
  constructor(private readonly messageService: MessageService) {}

  /**
   * Endpoint POST /api/v1/checkout
   * Recibe el carrito, crea la preferencia de pago y devuelve la URL de redirección.
   */
  @Post()
  async createCheckout(@Body() createCheckoutDto: CreateCheckoutDto) {
    // 1. Llamar al servicio para crear la preferencia con el array de ítems
    const paymentUrl = await this.messageService.createPreferenceFromItems(
      createCheckoutDto.items,
    );

    // 2. Devolver la URL como JSON para que React pueda redirigir
    return { redirectUrl: paymentUrl };
  }
}
