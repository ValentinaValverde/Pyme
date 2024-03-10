import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
	{
		productName: {
			type: String,
			required: [true, 'Please add product name']
		},
		productSlug: {
			type: String,
			required: [true, 'Every product needs a slug']
		},
		inInv: {
			type: Number,
			default: 0
		},
		productImage: {
			data: Buffer,
			contentType: String
			//required: ['Every product must have an image']
		},
		productDetails: {
			type: String,
			required: ['Please add details for this product']
		},
		price: {
			type: Number,
			required: ['Please add a price']
		},
		productStoreId: {
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

const ProductModel =
	mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default ProductModel
