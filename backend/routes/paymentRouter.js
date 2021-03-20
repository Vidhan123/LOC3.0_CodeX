const express = require('express');

const pay = require('../controllers/paymentController.js');

const paymentRouter = express.Router();

paymentRouter
  .route('/order')
  .get(pay.getPaymentOrder);

paymentRouter
  .route('/capture/:paymentId')
  .post(pay.postPayment);

module.exports = paymentRouter;
