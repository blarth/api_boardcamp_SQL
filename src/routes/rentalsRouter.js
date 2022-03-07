import express from "express";
import { rentalsGet, rentalsPost, rentalsPostReturn } from "../controllers/rentalsController.js";
import { dataHandlerRentals, dataHandlerRentalsReturn } from "../middlewares/dataHandlerRentals.js";
import { businessRulesRental, businessRulesRentalReturn } from "../middlewares/validateBusinessRulesRentals.js";
import { validateSchemaRentals } from "../middlewares/validateRentals.js";


const rentalRouter = express.Router();

rentalRouter.get("/rentals" , rentalsGet);

rentalRouter.post("/rentals", validateSchemaRentals, businessRulesRental, dataHandlerRentals, rentalsPost );

rentalRouter.post("/rentals/:id/return", businessRulesRentalReturn, dataHandlerRentalsReturn, rentalsPostReturn)

export default rentalRouter;
