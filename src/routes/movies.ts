import Router from 'koa-router'
import Joi from 'joi'
import { v4 } from 'uuid'

import { Movie } from 'src/classes/movieEntity'

export const movieRouter = new Router({ prefix: '/movies' })

const validMovie = Joi.object({
  title: Joi.string()
    .alphanum()
    .required(),

  genres: Joi.array()
    .items(Joi.string())
    .min(1)
    .required()
})

movieRouter.get('/', async (ctx) => {
  ctx.body = await Movie.find()
})

movieRouter.post('/', async (ctx) => {
  console.log(ctx.request.body)
  const data = await validMovie.validateAsync(ctx.request.body)
  const id = v4()
  console.log(id)
  const movie = new Movie({ id, ...data })
  ctx.body = await movie.save()
})

movieRouter.get('/:id', async (ctx) => {
  const id = ctx.params.id
  console.log(id)
  ctx.body = await Movie.findOne({ id: id })
})

movieRouter.put('/:id', async (ctx) => {
  console.log(ctx.params)
  console.log(ctx.request.body)
  await Movie.findOneAndUpdate(
    { id: ctx.params.id }, { ...ctx.request.body })
  ctx.body = await Movie.findOne({ id: ctx.params.id })
})

movieRouter.delete('/:id', async (ctx) => {
  const id = ctx.params.id
  console.log(id)
  ctx.body = await Movie.findOneAndDelete({ id: id })
})

// movieRouter.put('/:id', async (ctx) => {
//   const id = ctx.params.id
//   // const newTitle = ctx.request.body.title
//   // const newGenres = ctx.request.body.genres
//   ctx.body = await Movie.findByIdAndUpdate(id, { ...ctx.request.body })
// })
