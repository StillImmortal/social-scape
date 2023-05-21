import { Schema, model, models } from "mongoose";

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

const Token = models.Token || model('Token', TokenSchema)

export default Token