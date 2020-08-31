import { Request, Response } from 'express';
import converHourToMinutes from '../utils/convertHourToMinutes';
import db from '../database/connection';

interface scheduleItem {
  week_day: number;
  to: string;
  from: string;
}

export default class ClassesControler {
  async index(req: Request, res: Response) {
    const filters = req.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: 'Missing filters to search classes',
      });
    }
    const timeInMinutes = converHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .join('classes', 'class_schedule.class_id', '=', 'classes.id')
          .where('class_schedule.week_day', '=', Number(week_day))
          .where('class_schedule.from', '<=', timeInMinutes)
          .where('class_schedule.to', '>', timeInMinutes);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return res.json(classes);
  }

  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;
    const trx = await db.transaction();
    console.log('aqui');

    try {
      const insertUsersIds = await trx('users')
        .insert({
          name,
          avatar,
          whatsapp,
          bio,
        })
        .returning('*');

      const user_id = insertUsersIds[0];

      const insertedClassesIds = await trx('classes')
        .insert({
          subject,
          cost,
          user_id: user_id.id,
        })
        .returning('*');

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
        return {
          class_id: class_id.id,
          week_day: scheduleItem.week_day,
          to: converHourToMinutes(scheduleItem.to),
          from: converHourToMinutes(scheduleItem.from),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return res.status(201).send();
    } catch (err) {
      trx.rollback();
      return res
        .status(400)
        .json({ error: 'Unexpected error while creating new class' });
    }
  }
}
