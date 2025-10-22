import { IsNotEmpty, IsPositive, IsString, IsEnum } from 'class-validator';
import { CategoriaProducto } from '../../enums/CategoriaProducto.enum';
import { TipoUso } from '../../enums/TipoUso.enum';

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
  @IsEnum(TipoUso)
  tipo_uso: TipoUso;
}
