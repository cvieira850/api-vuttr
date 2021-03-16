import { DbAddTool } from './db-add-tool'
import { ToolModel,AddToolModel } from './db-add-tool-protocols'
import { AddToolRepository } from '../../protocols/add-tool-repository'

describe('DbAddTool Usecase', () => {
  test('Should call AddToolRepository with correct values ', async () => {
    class AddToolRepositoryStub implements AddToolRepository {
      async add (data: AddToolModel): Promise<ToolModel> {
        return {
          id: 'any_id',
          title: 'any_title',
          link: 'any_link',
          description: 'any_description',
          tags: [
            'any_tag',
            'any_other_tag'
          ]
        }
      }
    }
    const addToolRepositoryStub = new AddToolRepositoryStub()
    const sut = new DbAddTool(addToolRepositoryStub)
    const addSpy = jest.spyOn(addToolRepositoryStub,'add')
    const toolData = {
      title: 'any_title',
      link: 'any_link',
      description: 'any_description',
      tags: [
        'any_tag',
        'any_other_tag'
      ]
    }
    await sut.add(toolData)
    expect(addSpy).toHaveBeenCalledWith(toolData)
  })
})
