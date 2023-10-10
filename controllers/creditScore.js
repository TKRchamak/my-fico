const CreditScore = require("../models/creditScore");
const { creditScoreToGrade } = require("../utils/gradeScoreConvertors");
const CreditOptionsUtils = require("../utils/creditOptions");
const allowedBalanceConvertor = require("../utils/allowedBalanceConvertor");
const {
  rearrangeCreditOptions,
} = require("../utils/presentation/creditOptions");

const getCreditOptions = async (req, res) => {
  try {
    const creditScore = await CreditScore.getCreditScoreByUserId(
      req.body.user_id
    );
    let creditOptions = CreditOptionsUtils.getCreditOptions(500);

    if (creditScore) {

      creditOptions = CreditOptionsUtils.getCreditOptions(creditScore.score);

    }
    res.send(rearrangeCreditOptions(creditOptions));
  } catch (e) {
    console.log(e);
  }
};

const eligibility = async (req, res) => {
  try {
    const creditScore = await CreditScore.getCreditScoreByUserId(
      req.body.user_id
    );

    let remainingBalance = 200;
    if (creditScore) {
      const grade = creditScoreToGrade(creditScore);
      // allowedBalance = allowedBalanceConvertor(grade);

      if (creditScore.allowed_balance > req.body.shipping_fee) {
        res.send({
          allowed: true,
          allowed_balance: creditScore.allowed_balance,
        });
      } else {
        res.send({
          allowed: false,
          allowed_balance: creditScore.allowed_balance,
        });
      }
    } else {
      if (remainingBalance > req.body.shipping_fee) {
        res.send({
          allowed: true,
          allowed_balance: 200,
        });
      } else {
        res.send({
          allowed: false,
          allowed_balance: 200,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const getCreditScoreByUserId = async (req, res) => {
  try {
    const creditScore = await CreditScore.getCreditScoreByUserId(req.body.user_id);
    res.send(creditScore);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getCreditOptions,
  getCreditScoreByUserId,
  eligibility,
};
