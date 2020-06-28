import { Router, Response, Request } from 'express';

const routes = Router();
const helloWordRoute = Router();

helloWordRoute.get('/', (req: Request, res: Response) => {
  res.json(
    { message: 'hello word route' }
  );
});

routes.use('/api', helloWordRoute);

export default routes;
