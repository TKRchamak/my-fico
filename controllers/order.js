const OrderModel = require("../models/order");
const CreditScoreUtils = require("../utils/creditScore/adjustCreditScore");
const { updatePaymentArray } = require("../utils/payment");
const createOrder = async (req, res) => {
  try {
    const creditScore = await CreditScoreUtils.adjustAfterOrderCreation(
      req.body
    );
    const order = await OrderModel.createOrder(req.body);
    res.send({ order, creditScore });
  } catch (e) {
    console.log(e);
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await OrderModel.getOrdersByUserId(req.body.user_id);
    res.send(orders);
  } catch (e) {
    console.log(e);
  }
};

const getUpcomingPaymentsByUserId = async (req, res) => {
  try {
    const orders = await OrderModel.getUpcomingPaymentsByUserId(
      req.body.user_id
    );
    res.send(orders);
  } catch (e) {
    console.log(e);
  }
};

const addPaymentToExistingOrder = async (req, res) => {
  try {
    const orderToUpdate = await OrderModel.getOrdersByOrderId(
      req.body.order_id
    );

    let updatedOrderBody = updatePaymentArray(
      req.body.payment_id,
      req.body.payment_date,
      orderToUpdate
    );
    const updatedCreditScore = await CreditScoreUtils.adjustAfterPayment(
      updatedOrderBody.user_id,
      updatedOrderBody.payments[0].payable
    );

    const updatedOrder = await OrderModel.findOneOrderAndUpdate(
      updatedOrderBody
    );
    res.send({ updatedOrder, updatedCreditScore });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
  getOrdersByUserId,
  getUpcomingPaymentsByUserId,
  addPaymentToExistingOrder,
};
