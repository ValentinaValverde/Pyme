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
			type: String
		},
		ownerDetails: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

export const StoreStoryModel =
	mongoose.models.StoreStory || mongoose.model('StoreStory', StoreStorySchema)

export default StoreStoryModel
