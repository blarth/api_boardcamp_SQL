import express from 'express';
import catRouter from './categoriesRouter';

const router = express.Router()
router.use(catRouter)


export default router;