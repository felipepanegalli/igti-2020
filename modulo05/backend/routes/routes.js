const express = require('express');
const transactionRouter = express.Router();
const controller = require('../controller/transactionController');

transactionRouter.post('/', controller.create);
transactionRouter.get('/', controller.findByPeriod);
// transactionRouter.get('', controller.findOne);
transactionRouter.put('/:id', controller.update);
transactionRouter.delete('/:id', controller.remove);

module.exports = transactionRouter;
