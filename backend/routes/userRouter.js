const express = require('express');
const userController = require('../controllers/usersCtrl');
const isAuth = require('../middlewares/isAuth');

const userRouter = express.Router();
// !register
userRouter.post('/api/v1/users/register',userController.register);
// !login
userRouter.post('/api/v1/users/login',userController.login);
// !profile
userRouter.get('/api/v1/users/profile',isAuth,userController.profile);
// !change password
userRouter.put('/api/v1/users/change-password',isAuth,userController.changePassword);
// !update profile
userRouter.put('/api/v1/users/update-profile',isAuth,userController.updateProfile);

module.exports = userRouter;
