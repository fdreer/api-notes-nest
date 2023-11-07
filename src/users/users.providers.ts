import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'
import { Provider } from '@nestjs/common'
import { Providers } from 'src/providers.enum'

export const userProviders: Provider[] = [
  {
    provide: Providers.USER_REPO,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [Providers.DATA_SOURCE]
  }
]
