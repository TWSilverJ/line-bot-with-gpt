import { DataTypes, Model } from 'sequelize'

/**
 * Line 訊息
 */
export class LineMessage extends Model {
  static initModel = (
    /** @type {import('sequelize').Sequelize} */
    sequelize
  ) => LineMessage.init({
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
