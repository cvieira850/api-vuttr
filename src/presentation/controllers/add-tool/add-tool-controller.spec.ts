import { AddToolController } from './add-tool-controller'
import { AddTool,AddToolModel,ToolModel, HttpRequest } from './add-tool-protocols'

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    title: 'any_title',
    link: 'any_link',
    description: 'any_description',
    tags: [
      'any_tag',
      'any_other_tag'
    ]
  }
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
interface SutTypes {
  sut: AddToolController
  addToolStub: AddTool
}

const makeSut = (): SutTypes => {
  class AddToolStub implements AddTool {
    async add (data: AddToolModel): Promise<ToolModel> {
      return new Promise(resolve => resolve(makeFakeTool()))
    }
  }
  const addToolStub = new AddToolStub()
  const sut = new AddToolController(addToolStub)

  return {
    sut,
    addToolStub
  }
}

describe('AddTool Controller', () => {
  describe('AddTool', () => {
    test('Should call AddTool with correct values', async () => {
      const { sut, addToolStub } = makeSut()
      const addSpy = jest.spyOn(addToolStub,'add')
      const httpRequest = makeFakeHttpRequest()
      await sut.handle(httpRequest)
      expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
    })
  })
})
