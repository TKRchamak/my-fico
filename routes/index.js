"use strict";

const router = require("express").Router();
const order = require("./order");
const creditScore = require("./creditScore");

// router.get("/insurance/:user_id", insurance.getInsuranceByUserId);
// router.post("/insurance", insurance.createInsuranceWithShipmentId);
// router.post("/insurance/calculate-premium", insurance.calculateInsurance);
router.use("/order/", order);
router.use("/credit-score/", creditScore);
module.exports = router;
