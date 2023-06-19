import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'

export class Line extends Model<InferAttributes<Line>, InferCreationAttributes<Line>> {
  public declare id: CreationOptional<string>
  public declare userId: string
  public declare displayName: string
  public declare pictureUrl: string | null
  public declare statusMessage: string | null
  public declare language: string | null
  public declare createdAt: CreationOptional<Date>
  public declare updatedAt: CreationOptional<Date>
  public declare deletedAt: Date | null

  public static initModel = (sequelize: Sequelize) => Line.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: DataTypes.STRING,
    displayName: DataTypes.STRING,
    pictureUrl: DataTypes.STRING,
    statusMessage: DataTypes.STRING,
    language: DataTypes.STRING,
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

/**
 * Line 事件
 */
export class LineEvent extends Model<InferAttributes<LineEvent>, InferCreationAttributes<LineEvent>> {
  public declare id: CreationOptional<string>
  public declare webhookEventId: string
  public declare type: string
  public declare timestamp: Date
  public declare createdAt: CreationOptional<Date>
  public declare updatedAt: CreationOptional<Date>
  public declare deletedAt: Date | null

  public static initModel = (sequelize: Sequelize) => LineEvent.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    webhookEventId: DataTypes.STRING,
    type: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'line_event',
    paranoid: true,
    underscored: true
  })
}

export class LineEventSource extends Model<InferAttributes<LineEventSource>, InferCreationAttributes<LineEventSource>> {
  public declare id: CreationOptional<string>
  public declare type: string
  public declare userId: string | null
  public declare roomId: string | null
  public declare groupId: string | null
  public declare createdAt: CreationOptional<Date>
  public declare updatedAt: CreationOptional<Date>
  public declare deletedAt: Date | null

  public static initModel = (sequelize: Sequelize) => LineEventSource.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: DataTypes.STRING,
    userId: DataTypes.STRING,
    roomId: DataTypes.STRING,
    groupId: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'line_event',
    paranoid: true,
    underscored: true
  })
}

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
