import Router from 'koa-router'
import Joi from 'joi'
import { v4 } from 'uuid'

import { Rental } from 'src/classes/rentalEntity'

export const rentalRouter = new Router({ prefix: '/rentals' })

const validRental = Joi.object({

  movieId: Joi.string()
    .min(1)
    .required(),

  memberId: Joi.string()
    .min(1)
    .required(),

  date: Joi.string()
    .min(1)
    .max(30)
    .required()
})

rentalRouter.get('/', async (ctx) => {
  ctx.body = await Rental.find()
})

rentalRouter.post('/', async (ctx) => {
  console.log(ctx.request.body)
  const data = await validRental.validateAsync(ctx.request.body)
  const id = v4()
  const rental = new Rental({ id, movieId: data.movieId, memberId: data.memberId, date: data.date })
  ctx.body = await rental.save()
})

rentalRouter.get('/:id', async (ctx) => {
  const id = ctx.params.id
  console.log(id)
  ctx.body = await Rental.findOne({ id: id })
})

rentalRouter.put('/:id', async (ctx) => {
  console.log(ctx.params)
  console.log(ctx.request.body)
  ctx.body = await Rental.findOneAndUpdate(
    { id: ctx.params.id }, { ...ctx.request.body }, { new: true })

  // ctx.body = await Rental.findOne({ id: ctx.params.id })
})

// movieRouter.put('/:id', async (ctx) => {
//   const id = ctx.params.id
//   // const newTitle = ctx.request.body.title
//   // const newGenres = ctx.request.body.genres
//   ctx.body = await Movie.findByIdAndUpdate(id, { ...ctx.request.body })
// })

rentalRouter.delete('/:id', async (ctx) => {
  const id = ctx.params.id
  console.log(id)
  ctx.body = await Rental.findOneAndDelete({ id: id })
})
