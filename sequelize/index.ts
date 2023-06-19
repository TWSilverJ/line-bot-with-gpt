import { Sequelize } from 'sequelize'

import { database } from '../config/index.js'
import { Line, LineMessage } from './line.js'
import { User, UserLogin } from './user.js'

// 資料庫連線
const sequelize = new Sequelize(database)

// 測試連線
await sequelize.authenticate()
console.log(new Date().toISOString(), 'Connection has been established successfully.')

// Line
Line.initModel(sequelize)
LineMessage.initModel(sequelize)

// User
User.initModel(sequelize)
UserLogin.initModel(sequelize)
// await sequelize.sync()

export {
  Sequelize,
  sequelize,

  Line,
  LineMessage,

  User,
  UserLogin
}
