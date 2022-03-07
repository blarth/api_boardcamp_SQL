import sanitizeData from "../schemas/sanitizer.js";
import schemaValidateCustomer from "../schemas/schemaCustomers.js";

export function validateSchemaCustomer(req, res, next){
    const validation = schemaValidateCustomer.validate(req.body)
    
    if (validation.error) {
      res.status(400).send(validation.error.details)
      return;
    }
    

    res.locals.customers = {
        ...req.body,
        name : sanitizeData(req.body.name),
    }

    next()
}