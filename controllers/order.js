const OrderModel = require("../models/order");
const { updatePaymentArray } = require("../utils/payment");
const payment = async (req, res) => {
  try {
    const order = await OrderModel.createOrder(req.body);
    res.send(order);
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
    const updatedOrderTwo = await OrderModel.findOneOrderAndUpdate(
      updatedOrder
    );
    console.log(updatedOrderTwo);
    res.send(updatedOrderTwo);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  payment,
  getOrdersByUserId,
  getUpcomingPaymentsByUserId,
  addPaymentToExistingOrder,
};
