import { IsNotEmpty, IsPositive, IsString, IsEnum, IsNumber } from 'class-validator';
import { CategoriaProducto } from '../../enums/categoria-producto.enum';
import { SubcategoriaProducto } from 'src/enums/subcategoria-producto.enum';
import { TipoUso } from 'src/enums/tipo-uso.enum';
import { isNumber } from 'lodash';
import { Url } from 'url';

export class CreateProductoDto {
  
@IsString()
 @IsNotEmpty()
  img:Url

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
  
 @IsNumber()
 @IsNotEmpty()
 kg:number;

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
}
