import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as Yup from 'yup';
import db from '../database/connection';
import checkPassword from '../utils/checkPassword';

import authConfig from '../config/auth';

export default class SessionController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { email, password } = req.body;

    const user = await db('accounts').where('accounts.email', '=', email);

    if (!user[0]) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await checkPassword(password, user[0].password_hash))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, avatar } = user[0];

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
