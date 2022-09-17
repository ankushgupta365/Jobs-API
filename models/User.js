const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"],
        minLength: 3,
        maxLength: 15,
    },
    email: {
        type: String,
        required: [true, "Please enter the email"],
        //below is the regex for validation of email
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Please enter valid email"],
        //it specifies every email is unique
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        minLength: 3,
    }

})

// this middleware will run before saving the data
//we are hashing the password before saving
userSchema.pre('save', async function(){
    //generating random bytes 
    const salt = await bcrypt.genSalt(10)
    //referencing the password from the above schema and hashing it using bcrypt library
    this.password = await bcrypt.hash(this.password,salt)
})

//the collection name will going to be users in lowercase for this schema
module.exports = mongoose.model("Users", userSchema)