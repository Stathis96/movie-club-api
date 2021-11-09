import dotenv from 'dotenv'
dotenv.config()
const env = process.env

export const DBURL = env.DBURL as string ?? 'demoURL'
export const jwksUri = process.env.jwksUri ?? ''
export const issuer = process.env.issuer ?? ''