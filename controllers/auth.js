const login = async (req,res)=>{
    res.send("user logged in")
}
const register = async(req,res)=>{
    res.send("user registered")
}

module.exports = {
    login,
    register
}