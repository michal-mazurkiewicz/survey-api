const path = require('path')
const fs = require('fs/promises')
const dirname = path.dirname(path.resolve() + '/src/respository/')
const file = path.join(dirname, '/repository/db.json')

const read = async () => {
	const db = await fs.readFile(file)
	return JSON.parse(db.toString())
}

let respository = read()

exports.get = async () => {
	return await respository
}

exports.write = async (data) => {
	if(!Array.isArray(data)) throw Error('Data is not array.')
	const surveys = { surveys: data }
	await fs.writeFile(file, JSON.stringify(surveys))
	await respository
	respository = surveys
}

