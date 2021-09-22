const surveyService = require('../service/survey')
const apiResponse = require('../helpers/api-response')
const { validate } = require('express-validation')
const { createSurveyValidation, answerValidation } = require('../middleware/req-validation')



exports.createSurvey = [
	validate(createSurveyValidation),
	async ({ body }, res) => {
		await surveyService.createSurvey(body)
		apiResponse.successResponse(res, 'Success')
	}
]

exports.getSurvey = async ({ params }, res) => {
	try {
		const survey = await surveyService.getSurvey(params)
		apiResponse.successResponseWithData(res, survey)
	} catch (error) {
		apiResponse.errorResponse(res, error.message)
	}

}

exports.getSurveys = async (req, res) => {
	const survey = await surveyService.getSurveys()
	apiResponse.successResponseWithData(res, survey)
}

exports.submitResponse = [
	validate(answerValidation),
	async ({ params, body }, res) => {
		try {
			await surveyService.addResponse(params, body)
			apiResponse.successResponse(res, 'Success')
		} catch (error) {
			apiResponse.errorResponse(res, error.message)
		}

	}
]


