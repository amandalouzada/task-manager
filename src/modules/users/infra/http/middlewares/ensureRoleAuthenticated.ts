import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  roles: string[];
}


const hasRole = (roleName: string) => {
  const ensureRoleAuthenticated = (
    request: Request,
    response: Response,
    next: NextFunction,
  ): void => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub, roles } = decoded as ITokenPayload;

      if (!roles.includes(roleName)) throw new AppError(`${roleName} permission is required`, 401);

      request.user = {
        id: sub,
      };

      return next();
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Invalid JWT token', 401);
    }
  }
  return ensureRoleAuthenticated;
};

export default (roleName: string) => hasRole(roleName);
