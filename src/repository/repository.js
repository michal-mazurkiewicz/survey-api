const path = require('path')
const fs = require('fs/promises')
const dirname = path.dirname(path.resolve() + '/src/respository/')
const file = path.join(dirname, '/repository/db.json')

const connect = async () => {
	const db = await fs.readFile(file)
	return JSON.parse(db.toString())
}
let respository = connect()

const save = async (data) => {
	const surveys = { surveys: data }
	await fs.writeFile(file, JSON.stringify(surveys))
	await respository
	respository = surveys
}

exports.selectAll = async () => {
	return await respository
}

exports.selectById = async (id) => {
	const { surveys } = await respository
	const survey = surveys.find(s => s.id == id)
	if (!survey) throw Error(`Survey with id:${id} doesn't exist.`)
	return {...survey}
}

exports.update = async (survey) => {
	const {surveys} = {...await this.selectAll()}
	const index = surveys.find((s,i) => {if(s.id == survey.id){return i}})
	surveys[index] = survey
	await save(surveys)
}


exports.put = async (survey) => {
	const {surveys} = await this.selectAll()
	survey.id = surveys.length
	await save(surveys.concat(survey))
}