import mongoose from "mongoose";

const ShippingAddressSchema = new mongoose.Schema(
  {
    streetAddress: {
      type: String,
      required: [true, "Please add your street address"],
    },
    city: {
      type: String,
      required: [true, "Please add your city name"],
    },
    state: {
      type: String,
      required: [true, "Please add your State"],
    },
    zipcode: {
      type: String,
      required: [true, "Please add your zipcode"],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ShippingAddressModel =
  mongoose.models.ShippingAddress ||
  mongoose.model("ShippingAddress", ShippingAddressSchema);

  export default ShippingAddressModel;