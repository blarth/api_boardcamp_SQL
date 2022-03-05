import express from 'express';
import catRouter from './categoriesRouter.js';
import gameRouter from './gamesRouter.js';
import customerRouter from './customersRouter.js';

const router = express.Router()
router.use(catRouter)
router.use(gameRouter)
router.use(customerRouter)


export default router;