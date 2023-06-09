import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'

/**
 * Line 訊息
 */
export class LineMessage extends Model<InferAttributes<LineMessage>, InferCreationAttributes<LineMessage>> {
  public declare id: CreationOptional<string>
  public declare userId: string
  public declare message: string
  public declare reply: string
  public declare promptToken: number
  public declare completionToken: number
  public declare totalToken: number
  public declare createdAt: CreationOptional<Date>
  public declare updatedAt: CreationOptional<Date>
  public declare deletedAt: Date | null

  public static initModel = (sequelize: Sequelize) => LineMessage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: DataTypes.STRING,
    message: DataTypes.STRING,
    reply: DataTypes.STRING,
    promptToken: DataTypes.INTEGER,
    completionToken: DataTypes.INTEGER,
    totalToken: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'line_message',
    paranoid: true,
    underscored: true
  })
}
