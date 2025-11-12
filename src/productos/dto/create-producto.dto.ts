import { IsNotEmpty, IsPositive, IsString, IsEnum } from 'class-validator';
import { CategoriaProducto } from '../../enums/categoria-producto.enum';
import { SubcategoriaProducto } from 'src/enums/subcategoria-producto.enum';
import { TipoUso } from 'src/enums/tipo-uso.enum';

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
  @IsEnum(SubcategoriaProducto)
  subcategoria: SubcategoriaProducto;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TipoUso)
  tipo_uso: TipoUso;
}
