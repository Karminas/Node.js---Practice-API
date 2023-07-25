const asyncErrorHandler = require ('express-async-handler')
const contactModel = require ('../models/contactModel');

const getUsers = asyncErrorHandler (async (req, res) => {
    const contacts = await contactModel.find();
    res.status(200).json(contacts);
});

const getUserById = asyncErrorHandler (async(req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
});

const createNewUser = asyncErrorHandler (async(req, res) => {
    const {name, email, phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error ('All fields are mandatory!');
    }
    const addedContact = await contactModel.create({name, email, phone});
    res.status(201).json(addedContact);
});

const updateUserById = asyncErrorHandler (async(req, res) => {
    const foundUser = await contactModel.findById(req.params.id);
    const {name, email, phone} = req.body;
    if (!foundUser){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedUser = await contactModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json(updatedUser);
});

const deleteUserById = asyncErrorHandler (async(req, res) => {
    const foundContact = await contactModel.findByIdAndDelete(req.params.id);
    if (!foundContact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json (foundContact);
});

module.exports= {   
    getUsers, 
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById 
    };

