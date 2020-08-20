import express from 'express';

import multer from 'multer';

import multerConfig from './config/multer';

import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionController';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

const upload = multer(multerConfig);

const classesController = new ClassesController();
const connectionController = new ConnectionController();
const userController = new UserController();
const sessionController = new SessionController();

const routes = express.Router();

routes.get('/classes', classesController.index);

routes.post('/classes', classesController.create);

routes.get('/connections', connectionController.index);
routes.post('/connections', connectionController.create);

routes.get('/accounts', userController.index);
routes.post('/accounts', upload.single('image'), userController.create);

routes.post('/session', sessionController.store);

export default routes;
