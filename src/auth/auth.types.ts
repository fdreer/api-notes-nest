import { Request } from 'express'
import { IdType } from '../types'
import { Role } from '../users/entities/role'

export type Payload = {
  sub: IdType
  username: string
  role: Role
  iat?: number
  exp?: number
}

export interface CustomRequest extends Request {
  payload: Payload
}
