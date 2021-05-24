import { app } from '../config/express'
import { userRouter } from './user'
import { categoriesRouter } from './categories'
import { statesRouter } from './state_api'
import { docsRouter } from './docs'

app.use(docsRouter)
app.use(userRouter)
app.use(categoriesRouter)
app.use(statesRouter)