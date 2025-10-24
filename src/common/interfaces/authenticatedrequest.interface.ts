import { Rol } from 'src/enums/Rol.enum';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    role: Rol;
  };
}
