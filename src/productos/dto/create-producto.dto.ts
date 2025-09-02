import { IsNotEmpty, IsPositive, IsString, IsEnum, IsDate } from 'class-validator';
import { CategoriaProducto } from 'src/enums/CategoriaProducto.enum';
import { TipoUso } from 'src/enums/TipoUso.enum';

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
  @IsEnum(CategoriaProducto)
  categoria: CategoriaProducto;
  @IsNotEmpty()
  @IsString()
  @IsEnum (TipoUso)
  typo_uso: TipoUso;
  
}
