import express from 'express'
import path from 'path'
import logger from 'morgan'

const app = express()
const port=3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(process.cwd(), 'public')))

app.listen(port,()=>{
  console.log(`Server is listening port ${3000}`)
})
