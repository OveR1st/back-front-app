import mongoose from 'mongoose'
//User model
// road to MVC (Model View Controler)

export interface IUser {
	_id: string
	fullName: string
	email: string
	passwordHash: string
	avatarUrl?: string
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		avatarUrl: String,
	},
	{
		timestamps: true,
	}
)

export default mongoose.model<IUser>('User', UserSchema)
