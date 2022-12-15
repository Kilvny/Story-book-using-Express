const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema(
    {
    title: {
        type:String,
        required: true,
        trim: true
    },
    body: {
        type:String,
        required: true
    },
    status: {
        type:String,
        default: 'pubilc',
        enum: ['public','private','unpublished']
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User' // the user model , we want it to be connected to that
    }, 
    createdAt: {
        type:Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Story',StorySchema)