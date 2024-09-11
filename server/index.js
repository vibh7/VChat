import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import AuthRoutes from './routes/AuthRoute.js'

dotenv.config()

const app = express()

app.use(cors({
    origin : process.env.ORIGIN,
    methods :["PUT","POST","PATCH","DELETE","GET"],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",AuthRoutes)

const port = process.env.PORT || 8003
const databaseURL = process.env.DATABASE_URL

const server = app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})

mongoose
.connect(databaseURL)
.then(()=>console.log("DB connection successfull"))
.catch((err)=>console.log(err))
