import { DbAddTool } from './db-add-tool'
import { ToolModel,AddToolModel } from './db-add-tool-protocols'
import { AddToolRepository } from '../../protocols/add-tool-repository'

const makeFakeToolData = (): AddToolModel => ({
  title: 'any_title',
  link: 'any_link',
  description: 'any_description',
  tags: [
    'any_tag',
    'any_other_tag'
  ]
})

const makeFakeTool = (): ToolModel => ({
  id: 'any_id',
  title: 'any_title',
  link: 'any_link',
  description: 'any_description',
  tags: [
    'any_tag',
    'any_other_tag'
  ]
})

const makeAddToolRepository = (): AddToolRepository => {
  class AddToolRepositoryStub implements AddToolRepository {
    async add (data: AddToolModel): Promise<ToolModel> {
      return makeFakeTool()
    }
  }
  return new AddToolRepositoryStub()
}

interface SutTypes {
  sut: DbAddTool
  addToolRepositoryStub: AddToolRepository
}

const makeSut = (): SutTypes => {
  const addToolRepositoryStub = makeAddToolRepository()
  const sut = new DbAddTool(addToolRepositoryStub)
  return {
    sut,
    addToolRepositoryStub
  }
}

describe('DbAddTool Usecase', () => {
  test('Should call AddToolRepository with correct values ', async () => {
    const { sut, addToolRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addToolRepositoryStub,'add')
    const toolData = makeFakeToolData()
    await sut.add(toolData)
    expect(addSpy).toHaveBeenCalledWith(toolData)
  })
  test('Should throw if AddToolRepository throws',async () => {
    const { sut,addToolRepositoryStub } = makeSut()
    jest.spyOn(addToolRepositoryStub,'add').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.add(makeFakeToolData())
    await expect(promise).rejects.toThrow()
  })
})
