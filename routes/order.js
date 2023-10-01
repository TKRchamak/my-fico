const express = require("express");
const order = require("../controllers/order");
const router = express.Router();

router.post("/", order.payment);
router.post("/user-id", order.getOrdersByUserId);
router.post("/upcoming-payments/user-id", order.getUpcomingPaymentsByUserId);
router.post("/update-payment-status", order.addPaymentToExistingOrder);

module.exports = router;
