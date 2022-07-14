import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
	// console.log(token)
	if (token) {
		try {
			const decoded = jwt.verify(token, 'secret123') as { _id: string }

			req.body.userId = decoded._id
			next()
		} catch (error) {
			return res.status(403).json({
				message: 'No access 1',
			})
		}
	} else {
		return res.status(403).json({
			message: 'No access 2',
		})
	}
	// console.log('token', token)

	// res.send(token)
}
