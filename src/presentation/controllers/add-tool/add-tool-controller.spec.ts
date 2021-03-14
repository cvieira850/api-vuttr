import { AddToolController } from './add-tool-controller'
import { AddTool,AddToolModel,ToolModel } from './add-tool-protocols'

describe('AddTool Controller', () => {
  describe('AddTool', () => {
    test('Should call AddTool with correct values', async () => {
      class AddToolStub implements AddTool {
        async add (data: AddToolModel): Promise<ToolModel> {
          return new Promise(resolve => resolve({
            id: 'any_id',
            title: 'any_title',
            link: 'any_link',
            description: 'any_description',
            tags: [
              'any_tag',
              'any_other_tag'
            ]
          }))
        }
      }
      const addToolStub = new AddToolStub()
      const sut = new AddToolController(addToolStub)
      const addSpy = jest.spyOn(addToolStub,'add')
      await sut.handle({
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
      expect(addSpy).toHaveBeenCalledWith({
        title: 'any_title',
        link: 'any_link',
        description: 'any_description',
        tags: [
          'any_tag',
          'any_other_tag'
        ]
      })
    })
  })
})
