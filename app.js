import express from "express"
import morgan from "morgan"
import mongoose from "mongoose"
import dotenv from "dotenv"
import categoryRouter from "./routes/categoryRoute.js"
dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.set("view engine","ejs")
app.use(express.urlencoded({extended: true}))
app.use(categoryRouter)


mongoose.connect(process.env.CONNECTION)
.then(()=> console.log("DB Connected!"))
.catch((err)=> console.log(err))


app.listen(process.env.PORT, console.log(`working on port ${process.env.PORT}`))