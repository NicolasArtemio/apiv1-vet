import { Rol } from '../../enums/Rol.enum';

export interface AuthResponse {
  access_token: string;
  user: {
    email: string;
    role: Rol;
  };
}
