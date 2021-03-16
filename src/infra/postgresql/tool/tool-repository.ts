import { getRepository } from 'typeorm'
import { AddToolRepository } from '../../../data/protocols/add-tool-repository'
import { ToolModel } from '../../../domain/models/tool'
import { AddToolModel } from '../../../domain/usecases/add-tool'
import Tool from '../typeorm/entities/tool'

export class ToolPgRepository implements AddToolRepository {
  async add (data: AddToolModel): Promise<ToolModel> {
    const ToolRepository = getRepository(Tool)
    const toolCreated = ToolRepository.create(data)
    const toolSaved = await ToolRepository.save(toolCreated)
    return toolSaved
  }
}
