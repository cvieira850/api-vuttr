
import { AddTool, HttpRequest, HttpResponse } from './add-tool-protocols'
import { ServerError } from '../../errors'
export class AddToolController {
  constructor (private readonly addTool: AddTool) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.addTool.add(httpRequest.body)
      return null
    } catch (error) {
      return new Promise(resolve => resolve({
        statusCode: 500,
        body: new ServerError(error.stack)
      }))
    }
  }
}
