import joi from "joi";


const schemaGames = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal : joi.number().required(),
    categoryId : joi.number().required(),
    pricePerDay: joi.number().required()

  });

export default schemaGames;