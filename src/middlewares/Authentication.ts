import KoaJwt from 'koa-jwt'
import { koaJwtSecret } from 'jwks-rsa'
import { issuer, jwksUri } from 'src/config/app'

export const jwt = KoaJwt({
  secret: koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    // todo add .env
    jwksUri: jwksUri
  }),
  algorithms: ['RS256'],
  issuer: issuer,
  passthrough: false
})
