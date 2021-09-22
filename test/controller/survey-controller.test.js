require('../test-config')
const surveyController= require('../../src/controllers/survey')
const fs = require('fs/promises')
const { data } = require('../test-data')
const apiResponse = require('../../src/helpers/api-response')

jest.mock('../../src/helpers/api-response')

describe('Controller Test', () => {
	test('Should return list of surveys', async () => {
		await surveyController.getSurveys()
		expect(apiResponse.successResponseWithData).toBeCalledTimes(1)
		expect(apiResponse.successResponseWithData).toBeCalledWith(undefined, data)
	})

	test('Should return survey with given id', async () => {
		const req = {
			params: {
				id: 0
			}
		}
		await surveyController.getSurvey(req)
		expect(apiResponse.successResponseWithData).toBeCalledTimes(1)
		expect(apiResponse.successResponseWithData).toBeCalledWith(undefined, data.surveys[0])
	})

	test('Should return error if survey with id doenst exist', async () => {
		const req = {
			params: {
				id: 100
			}
		}
		await surveyController.getSurvey(req)
		expect(apiResponse.errorResponse).toBeCalledTimes(1)
		expect(apiResponse.errorResponse).toBeCalledWith(undefined, 'Survey with id:100 doesn\'t exist.')
	})

	test('Should create survey', async () => {
		const req = {
			body: {
				question: 'question',
				answers: ['a1', 'a2']
			}
		}
		await surveyController.createSurvey[1](req)
		expect(apiResponse.successResponse).toBeCalledTimes(1)
		expect(fs.writeFile).toBeCalledTimes(1)
	})

	test('Should submit response', async () => {
		const req = {
			params:{
				id: 0
			},
			body: {
				answerId: 0
			}
		}
		await surveyController.submitResponse[1](req)
		expect(apiResponse.successResponse).toBeCalledTimes(1)
		expect(fs.writeFile).toBeCalledTimes(1)
	})

	test('Should return error response', async () => {
		const req = {
			params:{
				id: 0
			},
			body: {
				answerId: 10
			}
		}
		await surveyController.submitResponse[1](req)
		expect(apiResponse.errorResponse).toBeCalledTimes(1)
		expect(apiResponse.errorResponse).toBeCalledWith(undefined, 'Answer with id:10 doesn\'t exist.')
		expect(fs.writeFile).toBeCalledTimes(0)
	})

	test('Should return error response', async () => {
		const req = {
			params:{
				id: 100
			},
			body: {
				answerId: 10
			}
		}
		await surveyController.submitResponse[1](req)
		expect(apiResponse.errorResponse).toBeCalledTimes(1)
		expect(apiResponse.errorResponse).toBeCalledWith(undefined, 'Survey with id:100 doesn\'t exist.')
		expect(fs.writeFile).toBeCalledTimes(0)
	})

})