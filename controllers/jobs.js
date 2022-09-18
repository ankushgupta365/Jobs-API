const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError, BadRequestError} = require('../errors')
const mongoose = require('mongoose')
const getJobs = async(req,res)=>{
    const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs,count: jobs.length})
}
const getJob = async(req,res)=>{
    // nested destructuring
    const {user: {userID}, params: {id: jobID}} = req
    const job = await Job.findOne({_id: jobID,createdBy: userID})
    if(!job){
        throw new NotFoundError("This job does not exist")
    }
    res.status(StatusCodes.OK).json(job)
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