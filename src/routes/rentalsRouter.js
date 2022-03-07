import express from "express";
import { rentalsGet } from "../controllers/rentalsController";


const rentalRouter = express.Router();

rentalRouter.get("/rentals" , rentalsGet);

/* rentalRouter.post("/rentals" ); */

/* rentalRouter.delete("/rentals") */

export default rentalRouter;
