const { Schema, model } = require("mongoose");
const CreditScoreSchema = new Schema({
  user_id: { type: String, required: false },
  score: { type: Number, required: false },
  total_payments: { type: Number, required: false },
  default_payments: { type: Number, required: false },
  total_due: { type: Number, required: false },
  allowed_balance: { type: Number, required: false },
  used_balance: { type: Number, required: false },
  total_full_loan_repayments: { type: Number, required: false },
});

const CreditScore = model("CreditScore", CreditScoreSchema);

async function getCreditScoreByUserId(user_id) {
  return CreditScore.findOne({ user_id: user_id });
}

async function updateCreditScore({}) {
  return CreditScore.create({});
}

async function createCreditScore(
  user_id,
  score,
  total_payments,
  default_payments,
  total_due,
  allowed_balance,
  used_balance,
  total_full_loan_repayments
) {
  return await CreditScore.create({
    user_id,
    score,
    total_payments,
    default_payments,
    total_due,
    allowed_balance,
    used_balance,
    total_full_loan_repayments,
  });
}

module.exports = { getCreditScoreByUserId, createCreditScore };
