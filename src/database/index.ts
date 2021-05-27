import { Connection, ConnectionOptions, createConnection } from 'typeorm'
const dbConfig = require('../../ormconfig')

async function createDbConnection(): Promise<Connection> {
    return createConnection(dbConfig as ConnectionOptions)
}

export { createDbConnection }