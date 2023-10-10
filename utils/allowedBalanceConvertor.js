const allowedBalance = {
  Excellent: 10000,
  "Very Good": 5000,
  Good: 1000,
  Fair: 500,
  Poor: 0,
};

function gradeToAllowedBalance(grade) {
  return allowedBalance[grade];
}
