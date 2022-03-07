import express from 'express';
import catRouter from './categoriesRouter.js';
import gameRouter from './gamesRouter.js';
import customerRouter from './customersRouter.js';
import rentalRouter from './rentalsRouter.js';

const router = express.Router()
router.use(catRouter)
router.use(gameRouter)
router.use(customerRouter)
router.use(rentalRouter)


export default router;