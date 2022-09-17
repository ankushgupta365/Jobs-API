const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const login = async (req,res)=>{
    res.send("user logged in")
}
const register = async(req,res)=>{
    const user =await User.create({...req.body})
    const token = jwt.sign({userID: user._id, name: user.name}, 'jwtsecretkeystring', {
        expiresIn: '30d'
    })
   res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
}

module.exports = {
    login,
    register
}