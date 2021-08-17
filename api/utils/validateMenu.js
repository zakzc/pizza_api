const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const logger = require("./logger");

function validateMenu(data) {
  console.log("Received request for validation");
  const schema = Joi.object({
    // id: Joi.objectId().required(),
    name: Joi.string().min(3).required(),
    price: Joi.number().min(1).required(),
    ingredients: Joi.array().min(1).required(),
    chef: Joi.string().min(3),
  });
  const isValid = schema.validate(data);
  if (isValid.error) {
    result = isValid.error.details[0].message;
    console.log("error on validation", result);
    return result;
  }
  console.log("valid");
  return false;
}

module.exports = validateMenu;
