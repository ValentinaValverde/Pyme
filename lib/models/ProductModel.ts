import mongoose, { Document } from 'mongoose';

export interface Product extends Document {
  productName: string;
  productSlug: string;
  inInv: number;
  productImage?: { data: Buffer; contentType: string };
  productDetails: string;
  price: number;
  productStoreId: mongoose.Schema.Types.ObjectId;
  active: boolean;
}


const ProductSchema = new mongoose.Schema<Product>(
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
			type: String,
			required: ['Every product must have an image']
		},
		productDetails: {
			type: String,
			required: [true, 'Please add details for this product']
		},
		price: {
			type: Number,
			required: [true, 'Please add a price']
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

export const ProductModel = mongoose.models.Product || mongoose.model<Product>('Product', ProductSchema);
