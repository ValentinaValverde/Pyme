import mongoose from 'mongoose'

const StoreStorySchema = new mongoose.Schema(
	{
		storeImage: {
			type: String,
			required: [true, 'Every store must have an image']
		},
		storeDetails: {
			type: String,
			required: [true, 'Every store must have a story']
		},
		ownerImage: {
			type: String,
			required: [true, 'Every owner must have an image']
		},
		ownerDetails: {
			type: String,
			required: [true, 'Every owner must have a story']
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

export const StoreStoryModel =
	mongoose.models.StoreStory || mongoose.model('StoreStory', StoreStorySchema)

export default StoreStoryModel
