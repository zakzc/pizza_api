const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const logger = require("./logger");

function validateMenu(data) {
  logger.info("Received request for validation");
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
    logger.info("error on validation", result);
    return result;
  }
  logger.info("valid");
  return false;
}

module.exports = validateMenu;
