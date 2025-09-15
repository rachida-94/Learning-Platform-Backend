require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`connected to MongoDB database:${mongoose.connection.name}`)
})
.catch(error =>{
    console.error('Failed to connect to MongoDB:',error.message)
    process.exit(1)//stop the app from running without connecting to DB

})

mongoose.connection.on('error',error =>{
    console.error('MongoDB connection error:',error.message)
})