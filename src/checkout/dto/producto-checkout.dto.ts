import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ProductoCheckoutDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsPositive()
  @IsNumber()
  unit_price: number;

  @IsPositive()
  @IsNumber()
  quantity: number;
}
