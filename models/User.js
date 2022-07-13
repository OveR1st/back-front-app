import mongoose from 'mongoose'
//User model
// road to MVC (Model View Controler)
const UserSchema = new mongoose.Schema(
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

export default mongoose.model('User', UserSchema)
