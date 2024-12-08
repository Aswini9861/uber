import express from "express"
import cors from "cors"
import connecttoDB from "./db/db.js"
import userRoutes from './routes/user.routes.js'
import cookieParser from "cookie-parser"
import captainRoutes from './routes/captain.routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


connecttoDB()
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/users',userRoutes)

app.use('/captain',captainRoutes)

export default app