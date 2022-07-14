import { body } from 'express-validator'

export const registerValidator = [
	body('email', 'Bad format email').isEmail(),
	body('password', 'Pass must have min 5 symbols length').isLength({ min: 5 }),
	body('fullName', 'Specify Full Name').isLength({ min: 3 }),
	body('avatarUrl', 'Bad link').optional().isURL(),
]

export const loginValidator = [
	body('email', 'Bad format email').isEmail(),
	body('password', 'Pass must have min 5 symbols length').isLength({ min: 5 }),
]

export const postValidator = [
	body('title', 'Enter article title').isLength({ min: 3 }).isString(),
	body('text', 'Enter description title').isLength({ min: 10 }).isString(),
	body('viewsCount').optional(),
	body('tags', 'Invalid tag format(array)').optional().isArray(),
	body('imageUrl', 'Bad link').isString(),
]
