const User = require("../models/users")
//TODO: Create controller functions for create,login,getuser
//@desc create User
//@route POST /api/users/
//@access Public
const createUser = (req,res) => {
    res.json({msg:"added a user"})
}

module.exports = {createUser}