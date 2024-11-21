import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { Routes } from './adapters/primary/router'

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

  public getApp(): Application {
    return this.app
  }

  public async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.app.listen(PORT, () => {
        console.log(`Server is running in port: ${PORT}`);
        resolve()
      }).on('error', reject)
    });
  }
}

export {
  AppServer
}
