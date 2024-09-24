const express = require('express')
const app = express()
const dotenv = require('dotenv').config()

const mongoose = require('mongoose')

const connectDB = require('./dataBase')

const authRouter = require('./routes/userRoutes')





const PORT = process.env.PORT || 9000

app.listen(PORT, ()=>{
    console.log('Server is running on',PORT)
})


app.use(express.json())

connectDB()


app.get('/', (req, res)=>{
    return res.status(200).json({
       message: "Hi Welcome to Our Page!"
    })
   })



   app.use("/api", authRouter)


   app.use((req, res)=>{
    return res.status(200).json({message: "Sorry this endpoint does not exist."})

})