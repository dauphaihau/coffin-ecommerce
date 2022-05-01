import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    slug: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    // image: { type: String, required: true },
    price: {type: Number, required: true},
    color: {type: String, required: true},
    salePrice: {type: Number},
    brand: {type: String, required: true},
    // rating: { type: Number, required: true, default: 0 },
    // numReviews: { type: Number, required: true, default: 0 },
    // countInStock: { type: Number, required: true, default: 0 },
    quantity: {type: Number, required: true, default: 0},
    description: {type: String, required: true},
    // reviews: [reviewSchema],
    // featuredImage: { type: String },
    sku: {type: String, required: true},
    tax: {type: Boolean},
    // isFeatured: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;