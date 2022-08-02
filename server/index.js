const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRoutes') )
app.use('/api/users',require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server Is Running At ${PORT}`)
}) 