require('../test-config')
const surveyService = require('../../src/service/survey')
const { data } = require('../test-data')


describe('Survey Service Test', () => {
	test('Should return surveys', async () => {
		const surveys = await surveyService.getSurveys()
		expect(surveys).toEqual(data)
	})

	test('Should return survey', async () => {
		const surveys = await surveyService.getSurvey({id: 0})
		expect(surveys).toEqual(data.surveys[0])
	})

	test('Should throw error', async () => {
		try {
			await surveyService.getSurvey({id: 10})
		} catch (error) {
			expect(error).toEqual(new Error('Survey with id:10 doesn\'t exist.'))
		}
	})

	test('Should throw error', async () => {
		try {
			await surveyService.addResponse({id: 10}, {answerId: 10})
		} catch (error) {
			expect(error).toEqual(new Error('Survey with id:10 doesn\'t exist.'))
		}
	})
	test('Should throw error', async () => {
		try {
			await surveyService.addResponse({id: 0}, {answerId: 10})
		} catch (error) {
			expect(error).toEqual(new Error('Answer with id:10 doesn\'t exist.'))
		}
	})
})