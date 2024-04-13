import mongoose from 'mongoose'

const CartItemSchema = new mongoose.Schema(
	{
		cartId: {
			type: String,
			required: [true]
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true],
			ref: 'Product'
		},
		store_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true],
			ref: 'Store'
		},
		quantity: {
			type: Number,
			required: [true]
		},
		priceAtTime: {
			type: Number,
			required: [true]
		}
	},
	{
		timestamps: true
	}
)

const CartItemModel =
	mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema)

export default CartItemModel
