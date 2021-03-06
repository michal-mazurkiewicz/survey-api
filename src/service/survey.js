const repository = require('../repository/file-repository')


exports.getSurveys = async () => {
	return await repository.selectAll()
}

exports.getSurvey = async ({ id }) => {
	const survey = await repository.selectById(id)
	if (!survey) throw Error(`Survey with id:${id} doesn't exist.`)
	return survey
}

exports.createSurvey = async ({ question, answers }) => {
	const newSurveys = { question: question, answers: answers.map((a, id) => { return { id, answer: a, votes: 0 } }) }
	await repository.put(newSurveys)
}

exports.addResponse = async ({ id }, { answerId }) => {
	const survey = await repository.selectById(id)
	if (!survey) throw Error(`Survey with id:${id} doesn't exist.`)
	const answer = survey.answers.find(a => a.id == answerId)
	if (!answer) throw Error(`Answer with id:${answerId} doesn't exist.`)
	answer.votes++
	await repository.update(survey)
}