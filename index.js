const express=require('express')
const db=require('./db')
const userModel=require('./Model/userModel')
const userRoute=require('./Routes/userRoute')
const cors=require("cors")

const app=express()


const port=4000;

app.use(express.json())
app.use(cors())
app.use('/api', userRoute)

app.listen(port, ()=>{
    console.log("Server is running on "+port)
})
