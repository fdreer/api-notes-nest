import { IdType } from '../../types'
import { Note } from '../../notes/entities/note.entity'
import { Role } from '../entities/role'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class ReadUserDto {
  @Expose()
  id: IdType

  @Expose()
  username: string

  @Expose()
  notes: Note[]

  @Expose()
  role: Role

  @Expose()
  createAt: Date

  @Expose()
  updateAt: Date
}
