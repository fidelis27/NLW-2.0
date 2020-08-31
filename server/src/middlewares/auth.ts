import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Request, Response } from 'express';

import authConfig from '../config/auth';

export default async (req: Request, res: Response, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not providen' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
