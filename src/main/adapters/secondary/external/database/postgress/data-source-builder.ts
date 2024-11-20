import 'reflect-metadata'
import * as pg from 'pg'
import { DataSource, EntityManager, Repository, EntityTarget, ObjectLiteral } from 'typeorm'
import { AppDataSource } from './data-source'

pg.types.setTypeParser(pg.types.builtins.TIMESTAMP, (stringValue: string) => new Date(`${stringValue}Z`))

let dataSource: DataSource | null = null

class DataSourceBuilder {
    public async initializeDataSource() {
        return await AppDataSource.initialize()
    }

    private async getDataSource() {
        if(!dataSource || !dataSource.isInitialized) {
            dataSource = await dataSourceBuilder.initializeDataSource()
        }
        
        return dataSource
    }

    public async getRepository(model: EntityTarget<ObjectLiteral>): Promise<Repository<ObjectLiteral> | null> {
        const dataSource = await this.getDataSource()
        
        if (dataSource && dataSource.isInitialized) {
            return dataSource.getRepository(model)
        }
        
        return null
    }
    
    public async getManager(): Promise<EntityManager | null> {
        const dataSource = await this.getDataSource()

        if (dataSource && dataSource.isInitialized) {
            return dataSource.manager
        }

        return null
    }
}

const dataSourceBuilder = new DataSourceBuilder()

export {
    dataSourceBuilder
}
