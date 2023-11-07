import * as process from 'process'
import { config } from 'dotenv'

config()
export const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env
