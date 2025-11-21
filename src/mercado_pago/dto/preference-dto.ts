import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreatePreferenceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
