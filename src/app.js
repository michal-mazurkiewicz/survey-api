const express = require('express')
const apiResponse = require('./helpers/api-response')
const apiRouter = require('./routes/api')
const cors = require('cors')
const { validate } = require('./middleware/req-validation')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


//Route Prefixes 
app.get('/', (req, res) => apiResponse.successResponse(res))
app.use('/api/', apiRouter)

// Validate request/handle errors
app.use(validate)

// throw 404 if URL not found
app.all('*', (req, res) => {
	apiResponse.notFoundResponse(res, 'Page not found')
})


module.exports = app