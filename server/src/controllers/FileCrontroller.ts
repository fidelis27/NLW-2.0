import { Request, Response } from 'express';
import stream from 'stream';
import knex from '../database/connection';

export default {
  async index(req: Request, res: Response) {
    await knex('files')
      .where({ name: req.params.avatarName })
      .first()
      .then(file => {
        const { data } = file;

        const fileContents = Buffer.from(data, 'base64');
        const readStream = new stream.PassThrough();
        readStream.end(fileContents);

        readStream.pipe(res);
      })
      .catch(err => {
        res.json({ msg: 'Error', detail: err });
      });
  },
};
