const asyncErrorHandler = require ("express-async-handler");
const jwt = require ("jsonwebtoken");

const validateToken = asyncErrorHandler (async (req, res, next) => {
    console.log("Hii");
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {

        token = authHeader.split(" ")[1];
        console.log(token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
            console.log("Hi Again");
            if (err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            console.log(decodedUser)
        });
    }
});

module.exports = validateToken;