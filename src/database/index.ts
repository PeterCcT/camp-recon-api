import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import * as dbConfig from '../../ormconfig'
async function createDbConnection(): Promise<Connection> {
    return createConnection(dbConfig as ConnectionOptions)
}

export { createDbConnection }