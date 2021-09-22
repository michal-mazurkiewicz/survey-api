const { Joi, ValidationError } = require('express-validation')
const { validationErrorResponse } = require('../helpers/api-response.js')

exports.createSurveyValidation = {
	body: Joi.object({
		question: Joi.string().required(),
		answers: Joi.array().min(2).items(Joi.string(), Joi.number()).required(),
	}),
}

exports.answerValidation = {
	body: Joi.object({
		answerId: Joi.number().required(),
	}),
}

// eslint-disable-next-line no-unused-vars
exports.validate = async (err, req, res, next) => {
	if (err instanceof ValidationError) {
		validationErrorResponse(res, err.details.body[0].message)
	}
}
