import * as Yup from 'yup';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../database/connection';

export default class UserController {
  async index(req: Request, res: Response) {
    const users = await db('accounts').select('*');
    return res.json(users);
  }

  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const { email, password, username, avatar, whatsapp, bio } = req.body;
    const userExists = await db('accounts').where('accounts.email', '=', email);

    if (userExists[0]) {
      return res.status(400).json({ erro: 'User already exists' });
    }

    const password_hash = await bcrypt.hash(password, 8);

    const fileName = req.file.originalname;

    await db('accounts').insert({
      username,
      email,
      password_hash,
      avatar: fileName,
      whatsapp,
      bio,
    });

    return res.status(201).send();
  }

  /* async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);
    const { id, name } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
    });
  } */
}
