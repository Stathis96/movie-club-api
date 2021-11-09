import { model, Schema } from 'mongoose'

const MovieSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  genres: [{
    type: String
  }]
})

export const Movie = model('Movie', MovieSchema)
