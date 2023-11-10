import { ApiProperty } from '@nestjs/swagger'
import { IdType } from '../../types'

// Lo utilizo como clase y no como un type de TypeScript para la docuentacion
// de OpenAPI
export class AuthResponse {
  @ApiProperty()
  jwt: string

  @ApiProperty()
  id: IdType
}
