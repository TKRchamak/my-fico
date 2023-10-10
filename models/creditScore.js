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

async function updateCreditScore(creditScore) {
  // console.log(creditScore);
  return CreditScore.findOneAndUpdate(
    { user_id: creditScore.user_id },
    creditScore,
    { new: true }
  );
}

async function updateCreditScore(creditScore) {
  return CreditScore.findOneAndUpdate(
    { user_id: creditScore.user_id },
    creditScore,
    { new: true }
  );
}

async function createCreditScore(userProfile) {
  return await CreditScore.create(userProfile);
}

module.exports = {
  getCreditScoreByUserId,
  createCreditScore,
  updateCreditScore,
};
