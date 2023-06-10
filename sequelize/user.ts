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

/**
 * 使用者登入記錄
 */
export class UserLogin extends Model<InferAttributes<UserLogin>, InferCreationAttributes<UserLogin>> {
  public declare id: CreationOptional<string>
  public declare idUser: string | null
  public declare loginTime: Date
  public declare loginType: string
  public declare ipAddress: string
  public declare userAgent: string
  public declare succeeded: boolean
  public declare revoked: boolean
  public declare expiresAt: Date | null
  public declare createdAt: CreationOptional<Date>
  public declare updatedAt: CreationOptional<Date>
  public declare deletedAt: Date | null

  /** 資料表結構初始化 */
  public static initModel = (sequelize: Sequelize) => UserLogin.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    idUser: DataTypes.UUID,
    loginTime: DataTypes.DATE,
    loginType: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
    userAgent: DataTypes.STRING,
    succeeded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    expiresAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'user_login',
    paranoid: true,
    underscored: true
  })
}
