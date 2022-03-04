import joi from "joi";


const schemaValidateName = joi.object({
    name: joi.string().required()
  });

export default schemaValidateName;