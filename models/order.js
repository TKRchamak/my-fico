const { Schema, model } = require("mongoose");
const { formFuturePaymentDeadlines } = require("../utils/payment");
const OrderSchema = new Schema({
  user_id: { type: String, required: false },
  shipment_id: { type: String, required: false },
  net_payable: { type: String, required: false },
  numberOfInstallments: { type: Number, required: false },
  payments: [
    {
      payable: { type: String, required: false },
      paid: { type: Boolean, required: false },
      paymentDeadline: { type: Date, required: false },
      paymentDate: { type: Date, required: false },
      defaults: { type: Number, required: false },
    },
  ],
  active: { type: Boolean, required: false },
});

const Order = model("Order", OrderSchema);

async function getOrdersByUserId(user_id) {
  return Order.find({ user_id: user_id });
}

async function getOrdersByOrderId(order_id) {
  return Order.findOne({ _id: order_id });
}

async function getUpcomingPaymentsByUserId(user_id) {
  return Order.aggregate([
    { $match: { $and: [{ user_id: user_id }, { active: true }] } },
    { $unwind: "$payments" },
    {
      $match: {
        "payments.paid": false,
      },
    },
  ]);
}

async function createOrder(order) {
  const payments = formFuturePaymentDeadlines(
    order.payments[0].paymentDeadline,
    order.payments[0].payable,
    order.numberOfInstallments
  );
  return Order.create({ ...order, payments });
}

async function findOneOrderAndUpdate(order) {
  // console.log(order);
  return Order.findOneAndUpdate({ _id: order._id }, order, { new: true });
}

module.exports = {
  getOrdersByUserId,
  getOrdersByOrderId,
  createOrder,
  findOneOrderAndUpdate,
  getUpcomingPaymentsByUserId,
};
