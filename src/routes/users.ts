import Router from 'koa-router'
import Joi from 'joi'
import { v4 } from 'uuid'

import { User } from 'src/classes/userEntity'

export const userRouter = new Router({ prefix: '/users' })

const validUser = Joi.object({
  title: Joi.string()
    .min(1)
    .max(30)
    .required(),

  DateOfBirth: Joi.string()
    .min(1)
    .max(30)
    .required(),

  Registration: Joi.string()
    .min(1)
    .max(30)
    .required()
})

userRouter.get('/', async (ctx) => {
  ctx.body = await User.find()
})

userRouter.post('/', async (ctx) => {
  console.log(ctx.request.body)
  const data = await validUser.validateAsync(ctx.request.body)
  const id = v4()
  const user = new User({ id, ...data })
  ctx.body = await user.save()
})

userRouter.get('/:id', async (ctx) => {
  const id = ctx.params.id
  console.log(id)
  ctx.body = await User.findOne({ id: id })
})

userRouter.put('/:id', async (ctx) => {
  console.log(ctx.params)
  console.log(ctx.request.body)
  await User.findOneAndUpdate(
    { id: ctx.params.id }, { ...ctx.request.body })
  ctx.body = await User.findOne({ id: ctx.params.id })
})

// movieRouter.put('/:id', async (ctx) => {
//   const id = ctx.params.id
//   // const newTitle = ctx.request.body.title
//   // const newGenres = ctx.request.body.genres
//   ctx.body = await Movie.findByIdAndUpdate(id, { ...ctx.request.body })
// })

userRouter.delete('/:id', async (ctx) => {
  const id = ctx.params.id
  console.log(id)
  ctx.body = await User.findOneAndDelete({ id: id })
})
