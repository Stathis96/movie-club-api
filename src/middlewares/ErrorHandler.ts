import { Context, Next } from 'koa'

export async function ErrorHandler (ctx: Context, next: Next): Promise<void> {
  try {
    console.log('before')
    await next()
    console.log('after')
  } catch (err) {
    if (err.name === 'ValidationError') {
      ctx.status = 422
      ctx.body = {
        message: err.message
      }
    } else {
      console.log('err', err.message)

      ctx.status = 500
      ctx.body = {
        message: 'Internal Error'
      }
    }
  }
}
