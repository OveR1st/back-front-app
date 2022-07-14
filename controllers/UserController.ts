import { IUser } from './../models/User'
import { Request, Response } from 'express'
import UserModel from '../models/User'

//hash lib
import bcrypt from 'bcrypt'
//token lib
import jwt from 'jsonwebtoken'

import { validationResult } from 'express-validator'

export const register = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}

		//hash password
		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const user = new UserModel({
			email: req.body.email,
			fullName: req.body.fullName,
			avatarUrl: req.body.avatarUrl,
			passwordHash: hash,
		})

		//save user to mongoDB
		await user.save()

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		)

		//TODO temp solution
		//@ts-ignore
		const { passwordHash, ...userData } = user._doc as IUser

		res.json({
			...userData,
			token,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Error register',
		})
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })
		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			})
		}

		const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash)

		if (!isValidPass) {
			return res.status(400).json({
				message: 'Login or Pass bad',
			})
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		)

		//TODO temp solution
		//@ts-ignore
		const { passwordHash, ...userData } = user._doc as IUser

		res.json({
			...userData,
			token,
		})
	} catch (error) {
		console.log(error)
		res.status(404).json({
			message: 'Error authorization',
		})
	}
}

export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findById(req.body.userId)

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			})
		}
		//TODO temp solution
		//@ts-ignore
		const { passwordHash, ...userData } = user._doc as IUser

		res.json(userData)
	} catch (error) {}
}
