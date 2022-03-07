import schemaValidateRental from "../schemas/schemaRentals";


export async function validateSchemaRentals(req, res, next){
    const validation = schemaValidateRental.validate(req.body)
  
    if (validation.error) {
      res.status(422).send(validation.error.details)
      return;
    }
    
    next()
}