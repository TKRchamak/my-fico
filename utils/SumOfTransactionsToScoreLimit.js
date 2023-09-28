const sumOfSuccessfulRepaymentsToScoreLimit = {
  10: 669,
  20: 739,
  30: 799,
  40: 850,
};

function getScoreLimitFromSumOfSuccessfulTransactions(
  numberOfSuccessfulTransactions
) {
  for (let bound in sumOfSuccessfulRepaymentsToScoreLimit) {
    if (bound > numberOfSuccessfulTransactions) {
      return sumOfSuccessfulRepaymentsToScoreLimit[bound];
    }
  }
}

module.exports = { getScoreLimitFromSumOfSuccessfulTransactions };
