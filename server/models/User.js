import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 32,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 32,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 32,
  },
  picturePath: {
    type: String,
    default: '',
  },
  friends: {
    type: Array,
    default: [],
  },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number,
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User

