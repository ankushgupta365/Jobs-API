const getJobs = async(req,res)=>{
    res.send("all jobs fetched")
}
const getJob = async(req,res)=>{
    res.send("single job with id fetched")
}
const createJob = async(req,res)=>{
    res.send("job created")
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