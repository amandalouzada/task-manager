import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import ensureRoleAuthenticated from '@modules/users/infra/http/middlewares/ensureRoleAuthenticated';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const tasksRouter = Router();
const taskController = new TaskController();


tasksRouter.post(
  '/',
  ensureRoleAuthenticated('admin'),
  taskController.create,
);

tasksRouter.get(
  '/',
  ensureAuthenticated,
  taskController.listByStatus,
);
tasksRouter.put(
  '/:id',
  ensureRoleAuthenticated('backoffice'),
  taskController.updateStatus,
);
export default tasksRouter;
