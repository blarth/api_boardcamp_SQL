import express from 'express';
import { categoriesGet, categoriesPost } from '../controllers/catController';

const catRouter = express.Router()

catRouter.get("/categories", categoriesGet);

catRouter.post("/categories", categoriesPost);

export default catRouter 