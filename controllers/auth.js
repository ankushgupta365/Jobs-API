const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const login = async (req,res)=>{
    res.send("user logged in")
}
const register = async(req,res)=>{
    const user =await User.create({...req.body})
   res.status(StatusCodes.CREATED).json({user})
}

module.exports = {
    login,
    register
}