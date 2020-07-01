import { Router } from 'express';
import AuthenticateController from '../controllers/AuthenticateController';

const authRouter = Router();
const authenticateController = new AuthenticateController();


authRouter.post(
  '/login',
  authenticateController.login,
);

export default authRouter;
