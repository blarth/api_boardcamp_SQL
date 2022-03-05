import sanitizeData from "../schemas/sanitizer.js"
import schemaGames from "../schemas/schemaGames.js"



export async function validateSchemaGames(req, res, next){
    const validation = schemaGames.validate(req.body)
  
    if (validation.error) {
      res.status(422).send(validation.error.details)
      return;
    }

    res.locals.games = {
        name : sanitizeData(req.body.name),
        image : sanitizeData(req.body.image),
        stockTotal : req.body.stockTotal,
        categoryId : req.body.categoryId,
        pricePerDay : req.body.pricePerDay
    }

    
    next()
}