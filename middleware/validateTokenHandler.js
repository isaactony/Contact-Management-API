const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization ||req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")) {
        //extract token from auth header
        //second index contains the token
        token = authHeader.split(" ")[1];

        //verify the integrity and authenticity of a JWT
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(404);
            throw new Error("User is not authorized to access");
        }

        //return the decoded payload if the token is valid.
        console.log(decoded);
        req.user = decoded.user;
        console.log(req.user);
        next();
        });

        if(!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing...");
        }
    }


})

module.exports = validateToken;