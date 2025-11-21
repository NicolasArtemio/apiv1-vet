import { Request } from 'express';
import { Rol } from '../../enums/rol.enum';

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    role: Rol;
    isAdmin: boolean;
  };
}
