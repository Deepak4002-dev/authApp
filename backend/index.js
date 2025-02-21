import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import DBconnection from './config/dbConnection.js'
import authRoute from './routes/auth.route.js'
import adminRoute from './routes/admin.route.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

DBconnection()

app.use('/auth',authRoute)
app.use('/admin',adminRoute)

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`App is listening to ${PORT} PORT`)
})
