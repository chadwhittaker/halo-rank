// 6163.23235325 to 6.2
export const wtokwUp = (num) => {
  var answer = (Math.ceil(num / 100) / 10).toFixed(1);
  return Number(answer)
};

// 6163.23235325 to 6.1
export const wtokwDown = (num) => {
  var answer = (Math.floor(num / 100) / 10).toFixed(1);
  return Number(answer)
};

export const round = (num, dec) => {
  var multiplier = Math.pow(10, dec);
  var answer = (Math.round(num * multiplier) / multiplier).toFixed(dec);
  return Number(answer)
};