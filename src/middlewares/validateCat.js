import schemaValidateName from "../schemas/schemaNameCat.js";
import sanitizeData from "../schemas/sanitizer.js"

export function validateSchemaCat(req, res, next){
    const validation = schemaValidateName.validate(req.body)
  
    if (validation.error) {
      res.status(422).send(validation.error.details)
      return;
    }
    

    res.locals.category = {
        name : sanitizeData(req.body.name),
    }

    next()
}