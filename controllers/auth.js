const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const login = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError("Please provide valid email and password")
    }
    //check the password
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        throw new UnauthenticatedError("Incorect password")
    }

    const token = user.getJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
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