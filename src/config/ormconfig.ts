import { ConnectionOptions } from 'typeorm'

const isProd = process.env.IS_PROD == 'true'

export const dbConfig: ConnectionOptions = {
    'type': 'postgres',
    'host': isProd ? '' : 'localhost',
    'port': Number(process.env.DATABASE_PORT),
    'username': isProd ? process.env.DATABASE_PROD_USERNAME : process.env.DATABASE_DEV_USERNAME,
    'password': isProd ? process.env.DATABASE_PROD_PASSWORD : process.env.DATABASE_DEV_PASSWORD,
    'migrations': isProd ? ['./dist/database/migrations/**.js'] : ['./src/database/migrations/**.ts'],
    'entities': isProd ? ['./dist/models/**.js'] : ['./src/models/**.ts'],
    'cli': {
        'migrationsDir': !isProd ? './src/database/migrations/' : ''
    }
}