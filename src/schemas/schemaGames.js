import joi from "joi";


const schemaGames = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal : joi.number().greater(0).required(),
    categoryId : joi.number().required(),
    pricePerDay: joi.number().greater(0).required()

  });

export default schemaGames;