import { AddToolModel } from '../../domain/usecases/add-tool'
import { ToolModel } from '../../domain/models/tool'
export interface AddToolRepository {
  add: (data: AddToolModel) => Promise<ToolModel>
}
