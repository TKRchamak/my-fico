const OrderModel = require("../models/order");
const payment = async (req, res) => {
  try {
    res.send();
  } catch (e) {
    console.log(e);
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    res.send();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  payment,
  getOrdersByUserId,
};
