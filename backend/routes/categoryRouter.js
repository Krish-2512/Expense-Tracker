const express = require('express');
const userController = require('../controllers/usersCtrl');
const isAuth = require('../middlewares/isAuth');
const categoryController = require('../controllers/categoryCtrl');

const categoryRouter = express.Router();
// !add
categoryRouter.post('/api/v1/categories/create',isAuth,categoryController.create);
// !lists
categoryRouter.get('/api/v1/categories/lists',isAuth,categoryController.lists);
// !update
categoryRouter.put('/api/v1/categories/update/:categoryId',isAuth,categoryController.update);
// !delete
categoryRouter.delete('/api/v1/categories/delete/:id',isAuth,categoryController.delete);


module.exports = categoryRouter;
