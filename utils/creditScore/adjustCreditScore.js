const CreditScore = require("../../models/creditScore");
async function adjustAfterOrderCreation(requestBody) {
  let existingCreditScore = await CreditScore.getCreditScoreByUserId(
    requestBody.user_id
  );

  let createdCreditScore = {};
  let updatedCreditScore = {};

  if (!existingCreditScore) {
    createdCreditScore = await CreditScore.createCreditScore({
      user_id: requestBody.user_id,
      score: 500,
      total_payments: 1,
      default_payments: 0,
      total_due: 0,
      allowed_balance: 200,
      used_balance: requestBody.net_payable - requestBody.payments[0].payable,
      total_full_loan_repayments: 0,
    });
    return createdCreditScore;
  } else {
    updatedCreditScore = await CreditScore.updateCreditScore(
      Object.assign(existingCreditScore, {
        total_payments: existingCreditScore.total_payments + 1,
        used_balance:
          +existingCreditScore.used_balance +
          (requestBody.net_payable - requestBody.payments[0].payable),
      })
    );
    return updatedCreditScore;
  }
}

module.exports = { adjustAfterOrderCreation };
