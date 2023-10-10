function rearrangeCreditOptions(raw) {
  // console.log(raw)
  let prepared = [];
  let length = 0;
  for (let numberOfInstallments in raw) {
    prepared.push({
      numberOfInstallments: numberOfInstallments,
      interest_rate: raw[numberOfInstallments],
    });
  }

  return prepared;
}

module.exports = { rearrangeCreditOptions };
