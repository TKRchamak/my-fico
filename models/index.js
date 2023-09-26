const { Schema, model } = require("mongoose");
const OrderSchema = new Schema({
  amount: { type: Number, required: false },
  user_id: { type: String, required: false },
  claimed: { type: Boolean, required: false },
});

const Order = model("Order", OrderSchema);

async function getOrdersByUserId(user_id) {
  return Order.find({ user_id: user_id });
}

async function createOrder({}) {
  return Order.create({});
}

module.exports = { getOrdersByUserId, createOrder };
