import express from 'express';
import { categoriesGet, categoriesPost } from '../controllers/catController.js';
import { validateSchemaCat } from '../middlewares/validateCat.js';

const catRouter = express.Router()

catRouter.get("/categories", categoriesGet);

catRouter.post("/categories", validateSchemaCat, categoriesPost);

export default catRouter 