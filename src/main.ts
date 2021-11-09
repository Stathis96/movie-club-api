import 'reflect-metadata'

import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-body'

import mongoose from 'mongoose'

import { movieRouter } from 'src/routes/movies'
import { DBURL } from './config/app'
import { userRouter } from './routes/users'
import { rentalRouter } from './routes/rentals'
// import { jwt } from './middlewares/Authentication'
import { ErrorHandler } from './middlewares/ErrorHandler'

async function main (): Promise<void> {
  const app = new Koa()

  // db connection
  const dbURI = DBURL
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err))

  app.use(cors())
    .use(bodyParser())
    // .use(jwt)

    .use(ErrorHandler)

  app.use(movieRouter.routes())
    .use(movieRouter.allowedMethods())

  app.use(userRouter.routes())
    .use(userRouter.allowedMethods())

  app.use(rentalRouter.routes())
    .use(rentalRouter.allowedMethods())

  app.listen(3000, () => {
    console.log('Listening at http://localhost:3000')
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
