import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import tasksRoutes from './routes/tasks.routes.js'

const app = express()

app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', tasksRoutes)
app.use((req, res) => res.sendStatus(404))

export default app