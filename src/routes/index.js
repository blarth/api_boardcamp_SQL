import express from 'express';
import catRouter from './categoriesRouter.js';

const router = express.Router()
router.use(catRouter)


export default router;