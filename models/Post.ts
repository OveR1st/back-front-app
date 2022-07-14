import mongoose, { ObjectId } from 'mongoose'
import { isArrayTypeNode } from 'typescript'
//Post model

export interface IPost {
	title: string
	text: string
	tags: string[]
	viewsCount: number
	user: ObjectId
	imageUrl: string
}

const PostSchema = new mongoose.Schema<IPost>(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
			unique: true,
		},
		tags: {
			type: [String],
			default: [],
		},
		viewsCount: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		imageUrl: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model<IPost>('Post', PostSchema)
