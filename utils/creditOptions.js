const { creditScoreToGrade } = require("./gradeScoreConvertors");

const InterestOptions = {
  Excellent: {
    2: 1.5,
    3: 1.75,
    4: 2,
  },
  "Very Good": {
    2: 1.75,
    3: 2,
    4: 2.5,
  },
  Good: {
    2: 2,
    3: 2.5,
    4: 3,
  },
  Fair: {
    2: 2.5,
    3: 3,
    4: 4,
  },
  Poor: {
    2: 3,
    3: 4,
    4: 5,
  },
};

function getCreditOptions(score) {
  const grade = creditScoreToGrade(score);
  return InterestOptions[grade];
}

module.exports = { getCreditOptions };
