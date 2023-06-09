import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'

/**
 * 使用者
 */
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  public declare id: CreationOptional<string>
  public declare email: string
  public declare password: string
  public declare name: string
  public declare birthday: Date | null
  public declare revoked: CreationOptional<boolean>
  public declare createdAt: CreationOptional<Date>
  public declare updatedAt: CreationOptional<Date>
  public declare deletedAt: Date | null

  public static initModel = (sequelize: Sequelize) => User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'user',
    paranoid: true,
    underscored: true
  })
}
