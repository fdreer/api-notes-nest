import { IdType } from '../../types'
import { User } from '../../users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Content, Title } from '../notes.config'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: IdType

  @Column({ length: Title.MAX_LENGTH, nullable: false })
  @ApiProperty()
  title: string

  @Column({ length: Content.MAX_LENGTH, nullable: false })
  @ApiProperty()
  content: string

  @Column({ default: false, nullable: false })
  @ApiProperty()
  important: boolean

  @Column({ type: 'uuid' })
  @ApiProperty()
  userId: IdType

  @ManyToOne(() => User, user => user.notes)
  user: User

  @CreateDateColumn()
  @ApiProperty()
  createAt: Date

  @UpdateDateColumn()
  @ApiProperty()
  updateAt: Date

  // convertToDto = (): ReadNoteDto => {
  //   const classNote = instanceToPlain(this)
  //   return plainToClass(ReadNoteDto, classNote)
  // }
}
