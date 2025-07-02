import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { ExpiresType } from '../types';
interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const generateToken = (
  payload: JwtPayload,
  secret: Secret,
  expiresIn: ExpiresType
) => {
  const options: SignOptions = {
    expiresIn, // TypeScript will now accept
  };

  const token = jwt.sign(payload, secret, options);
  return token;
};
