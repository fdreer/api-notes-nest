import { Note } from '../../notes/entities/note.entity'
import { IdType } from '../../types'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Role } from './role'
import { Password, Username } from '../user.config'
import { Exclude, Expose } from 'class-transformer'

@Entity()
@Exclude()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: IdType

  @Column({ unique: true, length: Username.MAX_LENGTH, nullable: false })
  username: string

  @Column({ length: Password.MAX_LENGTH, nullable: false })
  @Expose()
  password: string

  @OneToMany(() => Note, note => note.user)
  notes: Note[]

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    nullable: false
  })
  role: Role

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
