/**
 * 基本傳遞物件類別
 */
export abstract class BaseDtoModel {
  public id?: string
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date | null
}

/**
 * 基本實例物件類別
 */
export abstract class BaseEntityModel {
  public readonly id: string
  public readonly createdAt: Date
  public updatedAt: Date
  public deletedAt: Date | null

  constructor(id: string, createdAt: Date) {
    this.id = id
    this.createdAt = createdAt
  }
}
