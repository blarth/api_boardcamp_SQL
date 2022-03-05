import express from 'express';
import { gamesGet, gamesPost } from '../controllers/gamesController.js';
import { businessRulesGames } from '../middlewares/validateBusinessRulesGames.js';
import { validateSchemaGames } from '../middlewares/validateGames.js';


const gameRouter = express.Router()

gameRouter.get("/games", gamesGet);

gameRouter.post("/games", validateSchemaGames, businessRulesGames, gamesPost);

export default gameRouter 