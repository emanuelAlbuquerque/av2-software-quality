import dotenv from 'dotenv'
import path from "path"
import { DataSource } from "typeorm"

dotenv.config()

const PATH_FILES = path.join(__dirname, 'models/*.{ts,js}')
const PATH_FILES_MIGRATIONS = path.join(__dirname, 'migrations/*.{ts,js}')

export const AppDataSource = new DataSource({
    type: 'postgres',
    synchronize: false,
    logging: true,
    url: process.env.DATABASE_URL,
    entities: [PATH_FILES],
    migrations: [PATH_FILES_MIGRATIONS]
})