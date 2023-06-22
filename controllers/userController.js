const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bycrpt = require("bycrpt");


const registerUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All the fields are required");
    }
    const userAvailable = User.findOne({email});

    if (userAvailable) {
        res.status(400);
        throw new Error("User with this email already exists");
    }
    const hashedPassword = await bycrpt.hash(password, 10);
    console.log("Here is the hashed password", +hashedPassword)
    const user = await User.create({
        username,
        password: hashedPassword,
        email
    })
    console.log("User has been registered", +user);

    if (user) {
        res.status(201).json(_id: user.id, email: user.email);
    }
})



const loginUser = asyncHandler(async(req, res) => {
    res.json({message: "Login this user!"});
});




const currentUser = asyncHandler(async(req, res) => {
    res.json({message: "Current user information !"});
});
module.exports = {
    registerUser,
    loginUser,
    currentUser
}