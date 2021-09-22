/*
This is very simple file storage made for the purpose of this challange.
The interface was design in a way, to support usage of a real prod database.

To use different storage/database you should:

0. Implement own repository with the same public interface as file repository.
1. Use the Environment Variables to inject correct repository into service base on the variable value.
*/

const path = require('path')
const fs = require('fs/promises')
const dir = path.join(path.dirname(path.resolve() + '/src/respository/'), '/repository/db.json')

const readSurveysFromFile = async () => {
	const file = await fs.readFile(dir)
	return JSON.parse(file.toString())
}

const writeSurveysToFile = async (data) => {
	const surveys = { surveys: data }
	await fs.writeFile(dir, JSON.stringify(surveys))
}

exports.selectAll = async () => {
	return await readSurveysFromFile()
}

exports.selectById = async (id) => {
	const { surveys } = await this.selectAll()
	const survey = surveys.find(s => s.id == id)
	return survey
}

exports.update = async (survey) => {
	const { surveys } = await this.selectAll()
	const index = surveys.findIndex((s) => s.id == survey.id )
	surveys[index] = survey
	await writeSurveysToFile(surveys)
}

exports.put = async (survey) => {
	const { surveys } = await this.selectAll()
	survey.id = surveys.length
	await writeSurveysToFile(surveys.concat(survey))
}