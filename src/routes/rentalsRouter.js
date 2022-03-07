import express from "express";
import { rentalsGet, rentalsPost } from "../controllers/rentalsController";
import { dataHandlerRentals } from "../middlewares/dataHandlerRentals";
import { businessRulesRental } from "../middlewares/validateBusinessRulesRentals";
import { validateSchemaRentals } from "../middlewares/validateRentals";


const rentalRouter = express.Router();

rentalRouter.get("/rentals" , rentalsGet);

rentalRouter.post("/rentals", validateSchemaRentals, businessRulesRental, dataHandlerRentals, rentalsPost );

/* rentalRouter.delete("/rentals") */

export default rentalRouter;
