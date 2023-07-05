import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from './routes/auth.routes.js'
import tasksRoutes from './routes/tasks.routes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', tasksRoutes)

export default app