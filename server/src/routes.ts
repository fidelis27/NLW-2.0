import express from 'express';

import multer from 'multer';

import multerConfig from './config/multer';

import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionController';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import FilesController from './controllers/FileCrontroller';
import authMiddleware from './middlewares/auth';

const upload = multer(multerConfig);

const classesController = new ClassesController();
const connectionController = new ConnectionController();
const userController = new UserController();
const sessionController = new SessionController();

const routes = express.Router();
routes.use(express.static(`${__dirname}/temp`));

routes.get('/classes', classesController.index);

routes.post('/classes', classesController.create);

routes.get('/connections', connectionController.index);
routes.post('/connections', connectionController.create);

routes.get('/accounts', authMiddleware, userController.index);
routes.post('/accounts', userController.create);
routes.get('/image/:avatarName', FilesController.index);

routes.put(
  '/accounts',
  authMiddleware,

  userController.update
);
routes.patch(
  '/accounts',
  authMiddleware,
  upload.single('image'),
  userController.updateAvatar
);

routes.post('/session', sessionController.store);

export default routes;
