import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema(
	{
		order_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true],
			ref: 'Order'
		},
		product_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true],
			ref: 'Order'
		},
		quantity: {
			type: Number,
			required: [true]
		},
		price_at_time: {
			type: Number,
			required: [true]
		},
		status: {
			type: String,
			required: [true]
		}
	},
	{
		timestamps: true
	}
)

const OrderItemModel =
	mongoose.models.OrderItem || mongoose.model('OrderItem', OrderItemSchema)

export default OrderItemModel
