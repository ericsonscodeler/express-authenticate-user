import express from 'express'
import dotenv from 'dotenv'

import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import router from './router'

dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())

app.use(
  cors({
    credentials: true,
  }),
)

app.use('/', router())

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
