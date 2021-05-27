const isProd = process.env.IS_PROD == 'true'

const dbConfig = {
    'type': 'postgres',
    'migrations': isProd ? ['./dist/src/database/migrations/**.js'] : ['./src/database/migrations/**.ts'],
    'entities': isProd ? ['./dist/src/models/**.js'] : ['./src/models/**.ts'],
    'cli': {
        'migrationsDir': !isProd ? './src/database/migrations/' : './dist/src/migrations/'
    }
}
if (isProd) {
    Object.assign(dbConfig, {
        'url': process.env.DATABASE_URL,
        'ssl': {
            'rejectUnauthorized': false
        }
    })
} else {
    Object.assign(dbConfig, {
        'host': 'localhost',
        'port': Number(process.env.DATABASE_DEV_PORT),
        'username': process.env.DATABASE_DEV_USERNAME,
        'password': process.env.DATABASE_DEV_USERNAME,
    })
}

module.exports =  dbConfig 