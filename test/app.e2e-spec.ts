import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { BASE_URL } from '../src/constants'
import { UsersModule } from '../src/users/users.module'

describe('AppController (e2e)', () => {
  let app: INestApplication
  const userService = {
    getAll: () => {
      return 'Hello World!'
    }
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get(`/${BASE_URL}/users`)
      .expect(200)
      .expect(userService.getAll())
  })

  afterAll(async () => {
    await app.close()
  })
})
