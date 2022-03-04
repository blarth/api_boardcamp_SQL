import schemaValidateName from "../schemas/validateSchemaName.js";

export function validateSchemaCat(req, res, next){
    const validation = schemaValidateName.validate(req.body)
  
    if (validation.error) {
      res.status(422).send(validation.error.details)
      return;
    }

    res.locals.name = {
        name : sanitizeData(req.body.name),
    }

    next()
}