const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide company name"],
        maxLength: 30
    },
   position: {
    type: String,
    required: [true, "Please provide postion"],
    maxLength: 40
   }, 
   status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending'
   },
   //we will store unique user id in this field
   createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: [true, 'please provide user']
   }

}, {timestamps: true})

module.exports = mongoose.model('Job', JobSchema)