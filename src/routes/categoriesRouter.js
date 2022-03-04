import express from 'express';

const catRouter = express.Router()

catRouter.get("/categories", categoriesGet);

catRouter.post("/categories", categoriesPost);

export default catRouter 