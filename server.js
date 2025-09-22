require('dotenv').config()
require('./config/db-connection')
const express = require('express')
const router = express.Router()
const app = express()

const adminRouter =require('./routes/adminRouter')
const authRouter = require('./routes/auth-router')
const submissionRouter = require('./routes/submissionRouter')
const exerciseRouter = require('./routes/exerciseRoute')
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5000', // allow frontend
  credentials: true,
}))
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/exercises',exerciseRouter)
app.use('/api/submissions',submissionRouter)
app.use('/api/admin',adminRouter)



app.get('/',(req,res)=>{
    res.send('Leraning Platform API running...')
})


const PORT = process.env.PORT || 3000

app.listen(PORT,'0.0.0.0',()=> console.log(`Server running on port ${PORT}`))