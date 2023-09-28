const { Schema, model } = require("mongoose");
const OrderSchema = new Schema({
  user_id: { type: String, required: false },
  net_payable: { type: String, required: false },
  numberOfInstallments: { type: Number, required: false },
  shipment_id: { type: String, required: false },
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

async function createOrder({}) {
  return Order.create({});
}

module.exports = { getOrdersByUserId, createOrder };
