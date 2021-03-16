import { AddTool, AddToolModel, ToolModel } from './db-add-tool-protocols'
import { AddToolRepository } from '../../protocols/add-tool-repository'

export class DbAddTool implements AddTool {
  constructor (private readonly addToolRepository: AddToolRepository) {}
  async add (data: AddToolModel): Promise<ToolModel> {
    await this.addToolRepository.add(data)

    return null
  }
}
