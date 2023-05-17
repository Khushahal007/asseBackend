const express=require('express')
const db=require('./db')
const userModel=require('./Model/userModel')
const userRoute=require('./Routes/userRoute')
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config();

const app=express()


const port=process.env.PORT;

app.use(express.json())
app.use(cors())
app.use('/api', userRoute)

app.get("/", (req, res) => {
    console.log("Server is running...")
})

app.listen(port, ()=>{
    console.log("Server is running on "+port)
})