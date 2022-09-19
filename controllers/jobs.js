const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError, BadRequestError} = require('../errors')

const getJobs = async(req,res)=>{
    //createdBy is added in the job schema model to fetch only jobs related to that user which have logged in
    //we are getting req.user.userID from authentication middleware in middleware folder which runs everytime before job routes are accesed
    const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs,count: jobs.length})
}
const getJob = async(req,res)=>{
    // nested destructuring
    //below object will be: {userID: userID, jobID: id} == {userID: 8183821, jobID: 75dvjb22} this is just an example 
    const {user: {userID}, params: {id: jobID}} = req
    const job = await Job.findOne({_id: jobID,createdBy: userID})
    if(!job){
        throw new NotFoundError("This job does not exist")
    }
    res.status(StatusCodes.OK).json(job)
}
const createJob = async(req,res)=>{
    //we are getting req.user.userID from authentication middleware which run everytime for job routes and set user object on req, by verifying and decrypting the token from headers and getting payload from it(decrypting) and setting it on user object on req
    req.body.createdBy = req.user.userID
    //Job.create({req.body}) is same as Job.create(req.body)
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async(req,res)=>{
    //nested destructuring
    //below object will look like: {company: companyValue, position: positonValue, userID: userIDValue, jobID: jobIDValue}
    const {body: {company,position},user: {userID}, params: {id: jobID}} = req
    if(!company || !position){
        throw new BadRequestError("Please provide company or positon")
    }
    //parameter passed are findOneAndUpdate(query object, payload, options)
    //below passed option to mongoose function will return new object created after updating and also it will run all the validators which are set on the schema in the job model
    const job = await Job.findOneAndUpdate({_id: jobID, createdBy: userID},req.body,{new: true, runValidators: true})
    if(!job){
        throw new NotFoundError("This job does not exist")
    }
    res.status(StatusCodes.OK).json(job)
}
const deleteJob = async(req,res)=>{
    const {
        user: { userID },
        params: { id: jobId },
      } = req
    
      const job = await Job.findByIdAndRemove({
        _id: jobId,
        createdBy: userID,
      })
      if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
      }
      //we are not returning anything
      res.status(StatusCodes.OK).send()
}
module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}