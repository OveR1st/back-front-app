import { body } from 'express-validator'

export const registerValidator = [
	body('email', 'Bad format email').isEmail(),
	body('password', 'Pass must have min 5 symbols length').isLength({ min: 5 }),
	body('fullName', 'Specify Full Name').isLength({ min: 3 }),
	body('avatarUrl', 'Bad link').optional().isURL(),
]
