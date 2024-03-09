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
		// owner is currently a mock until we start using auth
		owner: {
			type: Number,
			required: [true, 'FKey']
		},
		owner_name: {
			type: String,
			required: [true, 'Please add store owner name'],
			unique: true
		},
		ein: {
			type: Number,
			required: [true, 'Please add store EIN']
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
