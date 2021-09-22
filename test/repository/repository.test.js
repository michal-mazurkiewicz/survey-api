require('../test-config')
const repository = require('../../src/repository/repository')
const { data } = require('../test-data')


describe('Repository Test', () => {
	test('Should return the data from json database', async () => {
		const response = await repository.get()
		expect(response).toEqual(data)
	})

	test('Should write to json database', async () => {
		const repo = await repository.get()
		expect(repo).toEqual(data)
		await repository.write([...data.surveys, {}])
		const {surveys} = await repository.get()
		expect(surveys.length).toEqual(2)
	})

	test('Should throw error if saved data is not array', async () => {	
		try {
			await repository.write(data)
		} catch (error) {
			expect(error.message).toEqual('Data is not array.')
		}
	})
})