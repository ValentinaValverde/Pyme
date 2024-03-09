import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please add a name'],
			unique: true
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true
		},
		password: {
			type: String,
			required: [true, 'Please add a password']
		},
		role: {
			type: String,
			default: 'Customer',
			required: [true, 'Please add a role']
		},
		active: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
)

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)

export default UserModel
