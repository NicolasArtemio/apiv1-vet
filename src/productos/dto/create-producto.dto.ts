import { IsNotEmpty, IsPositive, IsString, IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { CategoriaProducto } from '../../enums/categoria-producto.enum';
import { SubcategoriaProducto } from 'src/enums/subcategoria-producto.enum';
import { TipoUso } from 'src/enums/tipo-uso.enum';
import { isNumber } from 'lodash';
import { Url } from 'url';

export class CreateProductoDto {
  
@IsString()
 @IsNotEmpty()
  img:string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
  
  @IsNumber()
  kg?: number | null;

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
  @IsEnum(SubcategoriaProducto)
  subcategoria: SubcategoriaProducto;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TipoUso)
  tipo_uso: TipoUso;

  @IsOptional()
  @IsDateString()
  fecha_vencimiento?: Date;
}
