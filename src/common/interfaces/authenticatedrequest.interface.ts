import { Request } from 'express';
import { Rol } from 'src/enums/rol.enum';

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    role: Rol;
  };
}
