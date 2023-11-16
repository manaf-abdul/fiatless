import mongoose from 'mongoose'

const userModel = new mongoose.Schema(
  {
    first_name: String,
    last_name: Number,
  }
)
const User = mongoose.model("Users", userModel)

export default User