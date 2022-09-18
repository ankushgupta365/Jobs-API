const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError, BadRequestError} = require('../errors')
const mongoose = require('mongoose')
const getJobs = async(req,res)=>{
    res.json(req.user)
}
const getJob = async(req,res)=>{
    res.send("single job with id fetched")
}
const createJob = async(req,res)=>{
    req.body.createdBy = req.user.userID
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async(req,res)=>{
    res.send("job updated")
}
const deleteJob = async(req,res)=>{
    res.send("job deleted")
}
module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}