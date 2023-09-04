import mongoose from 'mongoose'

// Set Rule
const productSchema = new mongoose.Schema({
   name: {
      type: String,
      minlength: 2,
      maxlength: 55,
      trim: true,
      required: true
   },
   company: {
      type: String,
      minlength: 2,
      maxlength: 55,
      trim: true,
      required: true
   },
   price: {
      type: Number,
      min: 0,
      required: true,
   },
   freeShipping: {
      type: Boolean,
      default: false,
   },
   quantity: {
      type: Number,
      min: 0,
      required: true,
   },
   color: {
      type: [String],
      required: true,
   },
   inStock: {
      type: Boolean,
      default: true,
   },
   sellerId: {
      type: mongoose.ObjectId,
      ref: "User"
   },
   category: {
      type: String,
      required: true,
      trim: true,
      enum: ["grocery", "kitchen", "clothing", "electronics", "furniture", "cosmetics", "bakery", "liquor"]
   }
})

// Create Table
export const Product = mongoose.model("Product", productSchema)