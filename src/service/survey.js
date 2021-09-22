const repository = require('../repository/repository')


exports.getSurveys = async () => {
	return await repository.get()
}

exports.getSurvey = async ({ id }) => {
	const { surveys } = await repository.get()
	const survey = surveys.find(s => s.id == id)
	if (!survey) throw Error(`Survey with id:${id} doesn't exist.`)
	return survey
}

exports.createSurvey = async ({ question, answers }) => {
	const { surveys } = await repository.get()
	const newSurveys = surveys.concat({ id: surveys.length, question: question, answers: answers.map((a, id) => { return { id, answer: a, votes: 0 } }) })
	await repository.write(newSurveys)
}

exports.addResponse = async ({ id }, { answerId }) => {
	const { surveys } = await repository.get()
	const newSurveys = [...surveys]

	const survey = newSurveys.find(s => s.id == id)
	if (!survey) throw Error(`Survey with id:${id} doesn't exist.`)
	const answer = survey.answers.find(a => a.id == answerId)
	if (!answer) throw Error(`Answer with id:${answerId} doesn't exist.`)
	answer.votes++

	await repository.write(newSurveys)
}