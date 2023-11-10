import { IdType } from '../../types'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class ReadNoteDto {
  @Expose()
  id: IdType

  @Expose()
  title: string

  @Expose()
  content: string

  @Expose()
  important: boolean

  @Expose()
  createAt: Date

  @Expose()
  updateAt: Date
}
