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
<<<<<<< HEAD
  @IsNotEmpty()
  @IsString()
  @IsEnum (TipoUso)
=======
  
>>>>>>> 2d14aa927a6a180cb6f92773023ebe18baf8a901
  typo_uso: TipoUso;
  
}
