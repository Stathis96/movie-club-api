import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  DateOfBirth: {
    type: String,
    required: true
  },
  Registration: {
    type: String,
    required: true
  }
})

export const User = model('User', UserSchema)
