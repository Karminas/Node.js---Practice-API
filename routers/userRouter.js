const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createNewUser, updateUserById, deleteUserById } = require('../controllers/userController');

router.route('/contacts').get(getUsers);
router.route('/contacts/:id').get(getUserById);
router.route('/contacts').post(createNewUser);
router.route('/contacts/:id').put(updateUserById);
router.route('/contacts/:id').delete(deleteUserById);

module.exports = router;