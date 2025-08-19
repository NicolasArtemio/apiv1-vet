import { IsDate, IsInt, IsPositive } from 'class-validator';

export class createventadto {
  @IsPositive()
  @IsInt()
  id_cliente: number;

  @IsPositive()
  @IsInt()
  id_empleado: number;

  @IsPositive()
  total: number;

  @IsDate()
  fecha: Date;
}
