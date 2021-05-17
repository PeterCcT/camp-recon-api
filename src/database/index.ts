import { Connection, createConnection, getConnectionOptions } from 'typeorm'

async function createDbConnection(): Promise<Connection> {
    const defaultOptions = await getConnectionOptions()
    return createConnection(defaultOptions)
}

export { createDbConnection }