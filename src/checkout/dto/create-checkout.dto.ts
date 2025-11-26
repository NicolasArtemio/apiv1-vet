import {
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductoCheckoutDto } from './producto-checkout.dto';

export class CreateCheckoutDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductoCheckoutDto)
  items: ProductoCheckoutDto[];

  @IsNumber()
  total: number;
}
