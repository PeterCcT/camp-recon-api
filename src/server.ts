import './config/env'
import { app } from './config/express'
import { createDbConnection } from './database'

createDbConnection().then(
    () => import('./routes')
)

app.listen(
    process.env.PORT,
    () => console.log(`Server running on port ${process.env.PORT}`)
)