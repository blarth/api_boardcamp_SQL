import express from "express";
import { customersGet } from "../controllers/customersController.js";

const customerRouter = express.Router();

customerRouter.get("/customers" , customersGet);

export default customerRouter;
