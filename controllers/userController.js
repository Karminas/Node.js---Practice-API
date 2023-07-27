const asyncErrorHandler = require ('express-async-handler'); 
const User = require ("../models/userModel")
const ByCrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");

const register = asyncErrorHandler ( async (req, res) => {
    const {userName, email, password} = req.body;
    if (!userName || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email}); 
    if (userAvailable){
        res.status(400);
        throw new Error("This email already exists");
    }

    const hashedPassword = await ByCrypt.hash(password, 10);

    const userCreated = await User.create({
        userName, 
        email,
        password: hashedPassword,
    });

    if (userCreated){
        console.log('User successfully created');
        res.status(201).json({_id:userCreated._id, email: userCreated.email});
    }
    else{
        res.status(400);
        throw new Error ("User data is not valid.");
    }
});

const login = asyncErrorHandler ( async (req, res) => {
    const { email, password } = req.body;
    
    if (!email, !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const foundUser = await User.findOne({email});

    //Compare user with hash password
    if (foundUser && (await ByCrypt.compare(password, foundUser.password))){

        const accessToken = jwt.sign({
            user:{
                _id: foundUser._id,
                userName: foundUser.userName,
                email: foundUser.email,
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1m"});

        console.log(foundUser);
        res.status(200).json({accessToken}); 
    }else{
        res.status(401);
        throw new Error(" Email or password is not valid.");
    }
});

//@Desc Current user info
//
const current = asyncErrorHandler(async(req, res) => {
    res.status(200).json('current');
});

module.exports = { register, login, current };