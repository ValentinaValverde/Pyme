import mongoose from 'mongoose'

const StoreAddressSchema = new mongoose.Schema(
	{
		streetAddress: {
			type: String,
			required: [true, 'Please add your street address']
		},
		city: {
			type: String,
			required: [true, 'Please add your city name']
		},
		state: {
			type: String,
			required: [true, 'Please add your State']
		},
		zipcode: {
			type: String,
			required: [true, 'Please add your zipcode']
		},
		storeId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Store'
		}
	},
	{
		timestamps: true
	}
)

export const StoreAddressModel =
	mongoose.models.StoreAddress ||
	mongoose.model('StoreAddress', StoreAddressSchema)

export default StoreAddressModel
