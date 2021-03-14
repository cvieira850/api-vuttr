
import { AddTool } from './add-tool-protocols'

export class AddToolController {
  constructor (private readonly addTool: AddTool) {}
  async handle (httpRequest: any): Promise<any> {
    await this.addTool.add(httpRequest.body)

    return new Promise(resolve => resolve(null))
  }
}
