const express = require('express');
require('dotenv').config();
const {connection} = require('./config/db')
const {userRouter} = require('./Router/userRouter')
const cors= require('cors');
const app = express();

app.use(cors({
    origin:"*"
}))
app.use(express.json())


app.get("/",(req,res)=>{
    res.send('ho gya bahan!! congrates...')
});


app.use('/users',userRouter)


let port = process.env.port

app.listen(port,async()=>{
    await connection
    console.log(`port running on ${port}`)
    console.log('connected to db')
})