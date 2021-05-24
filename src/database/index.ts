import { Connection, createConnection, getConnectionOptions } from 'typeorm'
import { dbConfig } from '../config/ormconfig'
async function createDbConnection(): Promise<Connection> {
    return createConnection(dbConfig)
}

export { createDbConnection }