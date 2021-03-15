
import { AddTool, HttpRequest, HttpResponse } from './add-tool-protocols'
import { ok, serverError } from '../../helpers/http/http-helper'
export class AddToolController {
  constructor (private readonly addTool: AddTool) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const tool = await this.addTool.add(httpRequest.body)
      return ok(tool)
    } catch (error) {
      return serverError(error)
    }
  }
}
