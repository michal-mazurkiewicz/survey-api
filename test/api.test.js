require('./test-config')
const request = require('supertest')
const app = require('../src/app')
const fs = require('fs/promises')
const repository = require('../src/repository/repository')

describe('Test the survey path', () => {
	test('get should response with survey list', async () => {
		const response = await request(app).get('/api/survey')
		expect(response.statusCode).toBe(200)
	})

	test('get with id should response with survey', async () => {
		const response = await request(app).get('/api/survey/0')
		expect(response.statusCode).toBe(200)
	})

	test('get with non existing id should response with error', async () => {
		const response = await request(app).get('/api/survey/10')
		expect(response.statusCode).toBe(500)
		expect(JSON.parse(response.text).message).toEqual(
			'Survey with id:10 doesn\'t exist.'
		)
	})

	test('post survey with no body should return wrong request', async () => {
		const response = await request(app).post('/api/survey')
		expect(response.statusCode).toBe(400)
	})

	test('put survey with no id should return 404', async () => {
		const response = await request(app).put('/api/survey')
		expect(response.statusCode).toBe(404)
	})

	test('put survey with no body should return 400', async () => {
		const response = await request(app).put('/api/survey/0')
		expect(response.statusCode).toBe(400)
		expect(JSON.parse(response.text).message).toEqual('"answerId" is required')
	})

	test('should return error response when answer doesnt exist', async () => {
		const response = await request(app)
			.put('/api/survey/0')
			.send({ answerId: 100 })
		expect(response.statusCode).toBe(500)
		expect(JSON.parse(response.text).message).toEqual(
			'Answer with id:100 doesn\'t exist.'
		)
	})

	test('should return error response when answer doesnt exist', async () => {
		const response = await request(app)
			.put('/api/survey/110')
			.send({ answerId: 100 })
		expect(response.statusCode).toBe(500)
		expect(JSON.parse(response.text).message).toEqual(
			'Survey with id:110 doesn\'t exist.'
		)
	})

	test('should return ok response when correct request', async () => {
		const response = await request(app)
			.put('/api/survey/0')
			.send({ answerId: 1 })
		expect(response.statusCode).toBe(200)
		expect(JSON.parse(response.text).message).toEqual('Success')
		expect(fs.writeFile).toHaveBeenCalledTimes(1)
	})

	test('should return 400 when wrong request body', async () => {
		const response = await request(app)
			.post('/api/survey')
			.send({ answerId: 1 })
		expect(response.statusCode).toBe(400)
		expect(JSON.parse(response.text).message).toEqual('"question" is required')
	})

	test('should return 400 when wrong request body', async () => {
		const response = await request(app)
			.post('/api/survey')
			.send({ question: 'Favorite color?' })
		expect(response.statusCode).toBe(400)
		expect(JSON.parse(response.text).message).toEqual('"answers" is required')
		expect(fs.writeFile).toHaveBeenCalledTimes(0)
	})

	test('should return 400 when wrong request body', async () => {
		const response = await request(app)
			.post('/api/survey')
			.send({ question: 'Favorite color?', answers: [] })
		expect(response.statusCode).toBe(400)
		expect(JSON.parse(response.text).message).toEqual(
			'"answers" must contain at least 2 items'
		)
	})

	test('should return 200 when correct body', async () => {
		let {surveys} = await repository.get()
		expect(surveys.length).toEqual(1)
		const response = await request(app)
			.post('/api/survey')
			.send({ question: 'Favorite color?', answers: ['Black', 'White'] })
		expect(response.statusCode).toBe(200)
		expect(JSON.parse(response.text).message).toEqual('Success')
		expect(fs.writeFile).toHaveBeenCalledTimes(1)
		let after = await (await repository.get()).surveys
		expect(after.length).toEqual(2)
	})

	test('It should response with 404', async () => {
		const response = await request(app).get('/api/question')
		expect(response.statusCode).toBe(404)
	})
})
