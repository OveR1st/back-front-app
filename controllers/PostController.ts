import PostModel from '../models/Post'
import { Request, Response } from 'express'

export const getAll = async (req: Request, res: Response) => {
	try {
		const posts = await PostModel.find().populate('user').exec()
		res.status(200).json(posts)
	} catch (error) {
		res.status(500).json('Bad get posts')
	}
}

export const getOne = async (req: Request, res: Response) => {
	try {
		const postId = req.params.id
		PostModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					return res.status(500).json('Bad get post')
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Post not found',
					})
				}

				res.json(doc)
			}
		)
	} catch (error) {
		// res.status(500).json('Bad get posts')
	}
}

export const remove = async (req: Request, res: Response) => {
	try {
		const postId = req.params.id

		PostModel.findOneAndDelete(
			{
				_id: postId,
			},
			{},
			(err, doc) => {
				if (err) {
					return res.status(500).json('Bad delete post')
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Post not found',
					})
				}

				res.status(200).json({
					message: 'Delete OK',
				})
			}
		)
	} catch (error) {
		// res.status(500).json('Bad get posts')
	}
}

export const create = async (req: Request, res: Response) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags,
			viewsCount: req.body.viewsCount,
			user: req.body.userId,
			imageUrl: req.body.imageUrl,
		})
		const post = await doc.save()

		res.json(post)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Error create post',
		})
	}
}

export const update = async (req: Request, res: Response) => {
	try {
		const postId = req.params.id

		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				user: req.body.userId,
				tags: req.body.tags,
			}
		)

		res.json({
			success: true,
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error update post',
		})
	}
}
