const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI,{
            // settings options to stop unwanted console warnings
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        console.log(`MongoDB connected ${con.connection.host}`)
    } catch (error) {
        console.log(error)     
    }
}



module.exports = connectDB