const app = require('./app')
const port = 3000

app.listen(port, () => {
	// eslint-disable-next-line no-undef
	console.log(`Survey app listening at http://localhost:${port}`)
})