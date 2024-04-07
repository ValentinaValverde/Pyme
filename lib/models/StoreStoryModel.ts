import mongoose, { Document } from 'mongoose'

export interface StoreStory extends Document {
  storeImage: string
  storeDetails: string
  ownerImage: string
  ownerDetails: string
  storeId: mongoose.Schema.Types.ObjectId
}

const StoreStorySchema = new mongoose.Schema<StoreStory>(
  {
    storeImage: {
      type: String,
      required: [true, 'Every store must have an image'],
    },
    storeDetails: {
      type: String,
      required: [true, 'Every store must have a story'],
    },
    ownerImage: {
      type: String,
      required: [true, 'Every owner must have an image'],
    },
    ownerDetails: {
      type: String,
      required: [true, 'Every owner must have a story'],
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Store',
    },
  },
  {
    timestamps: true,
  }
)

export const StoreStoryModel =
  mongoose.models.StoreStory || mongoose.model('StoreStory', StoreStorySchema)
