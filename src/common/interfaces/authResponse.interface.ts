import { Rol } from '../../enums/rol.enum';

export interface AuthResponse {
  access_token: string;
  user: {
    email: string;
    role: Rol;
    isAdmin: boolean;
  };
}
