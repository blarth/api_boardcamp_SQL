import joi from "joi";

const schemaValidateCustomer = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(new RegExp('^[0-9]{10,11}')).required(),
    cpf : joi.string().pattern(new RegExp('^[0-9]{11}')).required(),
    birthday: joi.date().required()
  });

export default schemaValidateCustomer