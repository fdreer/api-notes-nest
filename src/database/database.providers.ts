import { Provider } from '@nestjs/common'
import { Note } from '../notes/entities/note.entity'
import { Providers } from '../providers.enum'
import { User } from '../users/entities/user.entity'
import { DataSource } from 'typeorm'
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  NODE_ENV
} from '../config/vars'

export const databaseProviders: Provider[] = [
  {
    provide: Providers.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: DB_HOST,
        port: 5432,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        entities: [Note, User],
        synchronize: NODE_ENV === 'development',
        dropSchema: NODE_ENV === 'development',
        logging: NODE_ENV === 'development',
        logger: 'advanced-console'
      })

      return dataSource.initialize()
    }
  }
]
