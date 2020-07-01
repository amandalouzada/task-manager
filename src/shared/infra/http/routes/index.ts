import { Router} from 'express';
import authRouter from '@modules/users/infra/http/routes/auth.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';

const routes = Router();


routes.use('/', authRouter);
routes.use('/users', usersRouter);
routes.use('/tasks', tasksRouter);

export default routes;
