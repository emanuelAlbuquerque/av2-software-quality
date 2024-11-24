import dotenv from 'dotenv'
import path from "path"
import { DataSource } from "typeorm"

dotenv.config()

const PATH_FILES = path.join(__dirname, 'models/*.{ts,js}')
const PATH_FILES_MIGRATIONS = path.join(__dirname, 'migrations/*.{ts,js}')
const PATH_FILES_MIGRATIONS_TEST = path.join(__dirname, 'migrations-test/*.{ts,js}')

export const AppDataSource = new DataSource({
    type: 'postgres',
    synchronize: false,
    url: process.env.NODE_ENV === "test" ? process.env.DATABASE_TEST_URL : process.env.DATABASE_PRODUCTION_URL,
    entities: [PATH_FILES],
    migrations: process.env.NODE_ENV === "test" ? [PATH_FILES_MIGRATIONS_TEST] : [PATH_FILES_MIGRATIONS],
    logging: false
})