import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: [true]
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
