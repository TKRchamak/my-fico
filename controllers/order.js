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
  // req.body = {
  //   order_id,
  //   payment_id,
  //   payment_date
  // }
  try {
    const orderToUpdate = await OrderModel.getOrdersByOrderId(
      req.body.order_id
    );
    // console.log(orderToUpdate);
    let updatedOrder = updatePaymentArray(
      req.body.payment_id,
      req.body.payment_date,
      orderToUpdate
    );

    // console.log(updatedOrder);
    // const updatedOrderTwo = await OrderModel.findOneOrderAndUpdate(
    //   updatedOrder
    // );
    // res.send(updatedOrderTwo);
    res.send(updatedOrder);
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
