import { Router } from 'express';

import authRouter from './auth.route';
import passwordRouter from './password.route';
import articleRouter from './articles.route';
import followRouter from './follow.route';
import userRouter from './users.route';

const router = Router();

router.use('/auth', authRouter);

router.use('/auth/users', passwordRouter);

router.use('/article', articleRouter);
router.use('/users', userRouter);

router.use('/profiles', userRouter);

router.use('/profiles', followRouter);

export default router;
