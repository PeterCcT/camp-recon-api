import { Connection, createConnection, getConnectionOptions } from 'typeorm'
import { getOrmConfigs } from '../config/ormconfig'
async function createDbConnection(): Promise<Connection> {
    const dbConfigs = getOrmConfigs()
    return createConnection(dbConfigs)
}

export { createDbConnection }