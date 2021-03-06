import express from "express";
import { customersGet, customersPost, customersPut } from "../controllers/customersController.js";
import { validateBusinessRulesCustomer } from "../middlewares/validateBusinessRulesCustomers.js";
import { validateSchemaCustomer } from "../middlewares/validateCustomer.js";

const customerRouter = express.Router();

customerRouter.get("/customers/:id?" , customersGet);

customerRouter.post("/customers" ,validateSchemaCustomer, validateBusinessRulesCustomer , customersPost);

customerRouter.put("/customers/:id" , validateSchemaCustomer, validateBusinessRulesCustomer, customersPut)

export default customerRouter;
