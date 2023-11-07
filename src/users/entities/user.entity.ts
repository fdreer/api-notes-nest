import { Note } from 'src/notes/entities/note.entity'
import { IdType } from 'src/types'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: IdType

  @Column({ unique: true, length: 50, nullable: false })
  username: string

  @Column({ nullable: false })
  password: string

  @OneToMany(() => Note, note => note.user)
  notes: Note[]

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
