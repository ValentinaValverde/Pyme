import mongoose from 'mongoose'

const StoreSchema = new mongoose.Schema(
	{
		storename: {
			type: String,
			required: [true, 'Please add your store name']
		},
		slug: {
			type: String,
			required: [true, 'Every Store needs a slug']
		},
		userId: {
			type: String,
			required: [true]
		},
		ownername: {
			type: String,
			required: [true, 'Please add store owner name']
		},
		ein: {
			type: Number,
			required: [true, 'Please add store EIN']
		},
		completeSignUp: {
			type: Boolean,
			default: false
		},
		completeAddress: {
			type: Boolean,
			default: false
		},
		completeStory: {
			type: Boolean,
			default: false
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

const StoreModel = mongoose.models.Store || mongoose.model('Store', StoreSchema)

export default StoreModel
