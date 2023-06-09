import { BaseDtoModel } from './baseModel.js'

export class UserDto extends BaseDtoModel {
  public email?: string
  public password?: string
  public name?: string
  public birthday?: string | null
}
