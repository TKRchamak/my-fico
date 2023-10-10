const express = require("express");
const creditScoreController = require("../controllers/creditScore");
const router = express.Router();

router.post("/credit-options", creditScoreController.getCreditOptions);
router.post("/eligibility", creditScoreController.eligibility);
router.post("/", creditScoreController.getCreditScoreByUserId);
module.exports = router;
