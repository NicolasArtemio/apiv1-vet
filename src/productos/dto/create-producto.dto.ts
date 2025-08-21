import { IsNotEmpty, IsPositive, IsString, IsEnum } from 'class-validator';
import { CategoriaProducto } from 'src/enums/CategoriaProducto.enum';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsPositive()
  precio: number;

  @IsPositive()
  stock: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(() => CategoriaProducto, {
    message:
      'La categoría debe ser uno de los tipos definidos en CategoriaProducto enum',
  })
  categoria: string;
  typo_uso: string;
  fecha_vencimiento: Date;
}
