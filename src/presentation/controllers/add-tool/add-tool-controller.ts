
import { AddTool, HttpRequest, HttpResponse } from './add-tool-protocols'
import { serverError } from '../../helpers/http/http-helper'
export class AddToolController {
  constructor (private readonly addTool: AddTool) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.addTool.add(httpRequest.body)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
