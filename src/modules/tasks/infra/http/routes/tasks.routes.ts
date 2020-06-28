import { Router } from 'express';
import TaskController from '../controllers/TaskController';

const tasksRouter = Router();
const taskController = new TaskController();


tasksRouter.post(
  '/',
  taskController.create,
);

tasksRouter.get(
  '/',
  taskController.listByStatus,
);
tasksRouter.put(
  '/:id',
  taskController.updateStatus,
);
export default tasksRouter;
