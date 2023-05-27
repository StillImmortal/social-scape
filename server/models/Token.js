import mongoose, { Schema, model } from 'mongoose'

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
})

const Token = mongoose.models.Token || model('Token', TokenSchema)

export default Token