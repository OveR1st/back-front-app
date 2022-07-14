//backend server
import express, { Express, Request, Response } from 'express'

//mongoDB lib
import mongoose from 'mongoose'

import { registerValidator } from './validations/auth'

import checkAuth from './utils/checkAuth'

import { getMe, login, register } from './controllers/UserController'

//connect MongoDB
mongoose
	.connect(
		'mongodb+srv://admin:12345@cluster0.umouy7e.mongodb.net/blog?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('DB OK')
	})
	.catch(err => console.log('DB err'))

//connect server express
const app: Express = express()

//can read json request
app.use(express.json())

//route
app.get('/', (req, res) => {
	res.send('Hello Im Server')
})

app.post('/auth/register', registerValidator, register)

app.post('/auth/login', login)

app.get('/auth/me', checkAuth, getMe)

app.listen(4444, () => {
	// if (err) {
	// 	// return console.log(err)
	// }

	console.log('Server OK')
})
