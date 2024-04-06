import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: [true]
		},
		storeId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Store'
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

const CartModel = mongoose.models.Cart || mongoose.model('Cart', CartSchema)

export default CartModel
