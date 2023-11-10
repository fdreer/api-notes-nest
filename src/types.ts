import { UUID } from 'crypto'

export type IdType = UUID
export type AuthResponse = {
  jwt: string
  id: IdType
}
