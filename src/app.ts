import express, { Application } from 'express'
import { Routes } from './adapters/primary/router'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

const PORT = process.env.PORT || '3500'

class AppServer {
  private app: Application

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }))
    this.app.use(morgan('dev'))
    this.app.use(new Routes().getRouter())

    dotenv.config()
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server is running in port: ${PORT}`)
    })
  }
}

export {
  AppServer
}