const grade = {
  579: "Poor",
  669: "Fair",
  739: "Good",
  799: "Very Good",
  850: "Excellent",
};

function creditScoreToGrade(score) {
  if (score > 850 || score < 0) return "give a valid score";
  for (let upper in grade) {
    if (score <= upper) {
      return grade[upper];
    }
  }
}

module.exports = { creditScoreToGrade };
