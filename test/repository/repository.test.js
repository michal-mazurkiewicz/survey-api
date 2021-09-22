require('../test-config')
const repository = require('../../src/repository/repository')
const { data } = require('../test-data')


describe('Repository Test', () => {
	test('Should return the data from json database', async () => {
		const response = await repository.selectAll()
		expect(response).toEqual(data)
	})

	test('Should write to json database', async () => {
		const repo = await repository.selectAll()
		expect(repo).toEqual(data)
		await repository.put({})
		const {surveys} = await repository.selectAll()
		expect(surveys.length).toEqual(2)
	})
})