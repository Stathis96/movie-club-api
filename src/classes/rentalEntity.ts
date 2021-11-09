import { model, Schema } from 'mongoose'

const RentalSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  movieId: {
    type: String,
    required: true
  },
  memberId: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

export const Rental = model('Rental', RentalSchema)
