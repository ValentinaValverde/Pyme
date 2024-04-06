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
