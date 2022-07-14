//backend server
import express, { Express, Request, Response } from 'express'

//mongoDB lib
import mongoose from 'mongoose'

import { registerValidator, loginValidator, postValidator } from './validations'

import checkAuth from './utils/checkAuth'

import * as UserController from './controllers/UserController'

import * as PostController from './controllers/PostController'

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

//auth api
app.post('/auth/register', registerValidator, UserController.register)

app.post('/auth/login', loginValidator, UserController.login)

app.get('/auth/me', checkAuth, UserController.getMe)

//posts api
app.get('/posts', checkAuth, PostController.getAll)
app.get('/posts/:id', checkAuth, PostController.getOne)
app.post('/posts', checkAuth, postValidator, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)

app.listen(4444, () => {
	// if (err) {
	// 	// return console.log(err)
	// }

	console.log('Server OK')
})
