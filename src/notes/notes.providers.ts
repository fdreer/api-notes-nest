import { DataSource } from 'typeorm'
import { Provider } from '@nestjs/common'
import { Providers } from 'src/providers.enum'
import { Note } from './entities/note.entity'

export const notesProviders: Provider[] = [
  {
    provide: Providers.NOTE_REPO,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Note),
    inject: [Providers.DATA_SOURCE]
  }
]
