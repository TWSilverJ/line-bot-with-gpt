import { BaseEntityModel } from './baseModel.js'

export class Line extends BaseEntityModel {
  public userId: string
  public displayName: string
  public pictureUrl: string | null
  public statusMessage: string | null
  public language: string | null
}
