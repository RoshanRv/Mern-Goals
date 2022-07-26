const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRoutes') )

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server Is Running At ${PORT}`)
}) 