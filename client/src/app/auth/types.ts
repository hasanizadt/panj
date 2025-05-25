export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  COWORKER = 'COWORKER',
  MODERATOR = 'MODERATOR',
  DELIVERY = 'DELIVERY',
  SELLER = 'SELLER'
}

export interface SignupInput {
  email: string;
  password: string;
  role: Role;
}

export interface SigninInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  email: string;
  role: Role;
}
