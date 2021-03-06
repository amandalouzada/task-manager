import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import ensureRoleAuthenticated from '../middlewares/ensureRoleAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();


usersRouter.post(
  '/',
  ensureRoleAuthenticated('admin'),
  usersController.createBackoffice,
);

usersRouter.get(
  '/',
  ensureRoleAuthenticated('admin'),
  usersController.listAll,
);


export default usersRouter;
