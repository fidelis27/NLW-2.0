import * as Yup from 'yup';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import db from '../database/connection';
import checkPassword from '../utils/checkPassword';

interface RequestData extends Request {
  userId: string;
}
export default class UserController {
  async index(req: RequestData, res: Response) {
    const user = await db('accounts')
      .select(['accounts.*', 'files.name', 'files.data'])
      .where('accounts.id', '=', req.userId)
      .join('files', 'accounts_id', '=', req.userId);
    return res.json(user);
  }

  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    const { email, password, name } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const userExists = await db('accounts').where('accounts.email', '=', email);

    if (userExists[0]) {
      return res.status(400).json({ erro: 'User already exists' });
    }

    const password_hash = await bcrypt.hash(password, 8);

    await db('accounts').insert({
      name,
      email,
      password_hash,
    });

    const accounts = await db('accounts').where({ email }).first();

    return res.status(201).send(accounts);
  }

  async update(req: RequestData, res: Response) {
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

    const { email, oldPassword, password, name } = req.body;

    const user = await await db('accounts')
      .select('*')
      .where('accounts.id', '=', req.userId)
      .first();

    if (email !== user.email) {
      const userExists = await db('accounts')
        .select('*')
        .where('accounts.email', '=', email)
        .first();

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }
    if (!(await checkPassword(oldPassword, user.password_hash))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const password_hash = await bcrypt.hash(password, 8);

    await db('accounts')
      .update({
        name,
        email,
        password_hash,
      })
      .where('accounts.id', '=', req.userId);

    const accounts = await db('accounts').where({ email }).first();

    return res.status(201).json(accounts);
  }

  async updateAvatar(req: RequestData, res: Response) {
    const existsFile = await db('files')
      .where('accounts_id', '=', req.userId)
      .first();

    const hash = crypto.randomBytes(6).toString('hex');

    const fileName = `${hash}-${req.file.originalname}`;
    const trx = await db.transaction();
    const file = {
      type: req.file.mimetype,
      name: fileName,
      data: req.file.buffer,
      accounts_id: req.userId,
    };

    await trx('accounts')
      .update({
        avatar: fileName,
      }).where('accounts.id', '=', req.userId);

    if (existsFile) {
      await trx('files').update(file).where('accounts_id', '=', req.userId);
      const ImageUpdte = await trx('accounts')
        .where('accounts.id', '=', req.userId)
        .first();

      trx.commit();
      return res.status(201).json(ImageUpdte);
    }
    await trx('files').insert(file);
    const ImageUpdte = await trx('accounts')
      .where('accounts.id', '=', req.userId)
      .first();
    trx.commit();

    return res.status(201).json(ImageUpdte);
  }
}
