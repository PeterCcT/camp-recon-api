import express from 'express'
import corsConfig from 'cors'

const app = express()
const cors = corsConfig()

app.use(express.json())
app.use(cors)

export { app }