const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const login = async (req,res)=>{
    res.send("user logged in")
}
const register = async(req,res)=>{
    const {name,email,password}= req.body
    //it will generate random bytes, more the value more strong password hashed
    const salt = await bcrypt.genSalt(10)
    //hashing the password using hash method
    const hashedPassword = await bcrypt.hash(password,salt)
    const tempUser = {name,email,password: hashedPassword}

    //creating user with hashedpassword
    const user = await User.create({...tempUser})

    res.status(StatusCodes.CREATED).json({user})
}

module.exports = {
    login,
    register
}