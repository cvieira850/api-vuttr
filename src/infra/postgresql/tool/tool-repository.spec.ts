import { ToolPgRepository } from './tool-repository'
import { Connection, getConnection } from 'typeorm'
import { tables } from '../tables'
import createConnection from '../typeorm/index'
import { AddToolModel } from '../../../domain/usecases/add-tool'

let connection: Connection

describe('Tool Pg Repository', () => {
  beforeAll(async () => {
    connection = await createConnection()
    for (const table of tables) {
      await connection.query(`DROP TABLE IF EXISTS ${table}`)
    }
    await connection.query('DROP TABLE IF EXISTS migrations')

    await connection.runMigrations()
  })

  beforeEach(async () => {
    for (const table of tables) {
      await connection.query(`DELETE FROM ${table}`)
    }
  })

  afterAll(async () => {
    const mainConnection = getConnection()
    await mainConnection.close()
    await connection.close()
  })

  const makeFakeToolData = (): AddToolModel => ({
    title: 'any_title',
    link: 'any_link',
    description: 'any_description',
    tags: [
      'any_tag',
      'any_other_tag'
    ]
  })

  const makeSut = (): ToolPgRepository => {
    return new ToolPgRepository()
  }

  test('Should add tool on success', async () => {
    const sut = makeSut()
    const response = await sut.add(makeFakeToolData())
    expect(response).toBeTruthy()
    expect(response.title).toBe('any_title')
    expect(response.link).toBe('any_link')
    expect(response.description).toBe('any_description')
  })
})
