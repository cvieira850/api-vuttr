
import { AddTool, HttpRequest, HttpResponse } from './add-tool-protocols'

export class AddToolController {
  constructor (private readonly addTool: AddTool) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addTool.add(httpRequest.body)

    return new Promise(resolve => resolve(null))
  }
}
