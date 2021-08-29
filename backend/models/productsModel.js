import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  uniq_id: { type: String },
  product_name: { type: String },
  retail_price: { type: Number },
  discounted_price: { type: Number },
  description: { type: Number },
  image: { type: Array },
  description: { type: String },
  product_rating: { type: String },
  overall_rating: { type: String },
  brand: { type: String },
});

const productsModel = mongoose.model("products", productsSchema, "products");

export default productsModel;
