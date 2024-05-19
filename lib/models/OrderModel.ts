export type OrderItem = {
  name: string
  slug: string
  qty: number
  image: string
  price: number
  color: string
  size: string
}

import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: 'Cart',
    },
    user_id: {
      type: String,
      required: [true],
    },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: 'Store',
    },
    total_price: {
      type: Number,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
)

const OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export default OrderModel
