const express = require('express');
const userController = require('../controllers/usersCtrl');
const isAuth = require('../middlewares/isAuth');
const categoryController = require('../controllers/categoryCtrl');
const transactionController = require('../controllers/transactionCtrl');

const transactionRouter = express.Router();
// !add
transactionRouter.post('/api/v1/transaction/create',isAuth,transactionController.create);
// !lists
transactionRouter.get('/api/v1/transaction/lists',isAuth,transactionController.getFilteredTransactions);

// !update
transactionRouter.put('/api/v1/transaction/update/:id',isAuth,transactionController.update);

// !delete
transactionRouter.delete('/api/v1/transaction/delete/:id',isAuth,transactionController.delete);

module.exports = transactionRouter;
