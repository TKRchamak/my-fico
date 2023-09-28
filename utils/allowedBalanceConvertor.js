const allowedBalance = {
  Excellent: 10000,
  "Very Good": 5000,
  Good: 500,
  Fair: 200,
  Poor: 0,
};

function gradeToAllowedBalance(grade) {
  return allowedBalance[grade];
}
