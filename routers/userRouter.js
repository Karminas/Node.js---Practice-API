const express = require ('express');
const userRouter = express.Router();
const validateToken = require ("../middleware/validateTokenHandler");
const { register, login, current } = require ('../controllers/userController');


userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.get('/current', validateToken, current);

module.exports = userRouter;