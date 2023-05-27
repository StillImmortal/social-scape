import mongoose, { Schema, model } from 'mongoose'

const UserSchema = new Schema({
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
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
    unique: true,
    required: true,
  },
  picturePath: {
      type: String,
      default: '',
  },
  friends: {
    type: Array,
    default: [],
  },
  location: {
    type: String,
    default: '',
  },
    occupation: {
      type: String,
      default: '',
  },
  viewedProfile: {
    type: Number,
    default: 0,
  },
  impressions: {
    type: Number,
    default: 0,
  },
}, { timestamps: true })

const User = mongoose.models.User || model("User", UserSchema)

export default User

