import { Router } from 'oak';
import {
    createProject,
    createTask,
    createUser,
    generateToken,
    startTask,
    stopTask,
} from '../controllers/controllers.ts';
import { authUser } from '../middleware/authMiddleware.ts';

const appRouter = new Router();
appRouter.post('/createUser', createUser);
appRouter.post('/generateToken', generateToken);
appRouter.post('/createProject', authUser, createProject);
appRouter.post('/createTask', authUser, createTask);
appRouter.post('/stopTask', authUser, stopTask);
appRouter.post('/startTask', authUser, startTask);

export default appRouter;
