import mongoose from 'mongoose'

const userModel = new mongoose.Schema(
  {
    name: String,
    price: Number,
  }
)
const Product = mongoose.model("Products", userModel)

export default Product