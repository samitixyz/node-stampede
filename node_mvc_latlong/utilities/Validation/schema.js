const Joi = require('joi');
const schema = Joi.object().keys({
    ip: Joi.string().ip().required(),
    coordinates: Joi.object({
        x: Joi.number().required(),
        y: Joi.number().required()
    }).required()
})

module.exports = schema;