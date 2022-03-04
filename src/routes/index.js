import express from 'express';
import catRouter from './categoriesRouter.js';
import gameRouter from './gamesRouter.js';

const router = express.Router()
router.use(catRouter)
router.use(gameRouter)


export default router;