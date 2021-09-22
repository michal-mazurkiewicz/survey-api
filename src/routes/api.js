const express = require('express')
const surveyRouter = require('./survey')

const app = express()
app.use('/survey', surveyRouter)

module.exports = app