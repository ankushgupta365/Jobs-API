const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const login = async (req,res)=>{
    res.send("user logged in")
}
const register = async(req,res)=>{
    const user =await User.create({...req.body})
    //calling instance method of schema
    const token = user.getJWT()
   res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
}

module.exports = {
    login,
    register
}