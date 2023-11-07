import { Exclude } from 'class-transformer'
import { IdType } from 'src/types'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: IdType

  @Column({ length: 100, nullable: false })
  title: string

  @Column({ length: 1000, nullable: false })
  content: string

  @Column({ nullable: false })
  important: boolean

  @Column({ type: 'uuid' })
  @Exclude()
  userId: IdType

  @ManyToOne(() => User, user => user.notes)
  user: User

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
