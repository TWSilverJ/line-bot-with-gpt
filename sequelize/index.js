import { Sequelize } from 'sequelize'

import { databaseConfig } from '../config/index.js'
import { LineMessage } from './line.js'

// 資料庫連線
const sequelize = new Sequelize(databaseConfig)

// 測試連線
await sequelize.authenticate()
console.log(new Date().toISOString(), 'Connection has been established successfully.')

LineMessage.initModel(sequelize)
// await sequelize.sync()

export {
  sequelize,
  LineMessage
}