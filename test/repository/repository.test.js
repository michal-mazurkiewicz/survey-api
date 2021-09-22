require('../test-config')
const repository = require('../../src/repository/file-repository')
const { data } = require('../test-data')
const fs = require('fs/promises')
const path = require('path')

describe('Repository Test', () => {
	test('Should return the data from json database', async () => {
		const response = await repository.selectAll()
		expect(response).toEqual(data)
	})

	test('Should write to json database', async () => {
		const dir = path.join(path.dirname(path.resolve() + '/src/respository/'), '/repository/db.json')
		const expected = {surveys: data.surveys.concat({question: 'question', id: 1})}
		
		await repository.put({question: 'question'})
		expect(fs.writeFile).toBeCalledWith(dir,JSON.stringify(expected))
		expect(fs.writeFile).toHaveBeenCalledTimes(1)
	})
})