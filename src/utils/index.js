// 6163.23235325 to 6.2
export const wtokwUp = (num) => {
  let answer = (Math.ceil(num / 100) / 10).toFixed(1);
  return answer
};

export const wtokwUp0 = (num) => {
  let answer = (Math.ceil(num / 1000)).toFixed(0);
  return answer
};

// 6163.23235325 to 6.1
export const wtokwDown = (num) => {
  let answer = (Math.floor(num / 100) / 10).toFixed(1);
  return answer
};

export const round = (num, dec) => {
  let multiplier = Math.pow(10, dec);
  let answer = (Math.round(num * multiplier) / multiplier).toFixed(dec);
  return answer
};
export const wtokwRound = (num, dec) => {
  let kw = num / 1000;
  let multiplier = Math.pow(10, dec);
  let answer = (Math.round(kw * multiplier) / multiplier).toFixed(dec);
  return answer
};

// calculate one daily profile for each month
export const getDailyProfile = (outputs) => {

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let hourlyProfiles = [];
  hourlyProfiles = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

  let hourlySum = [];
  hourlySum = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  
  let days = 0;

  for(var m = 0; m < 12; m++){
      for(var d = 0; d < daysInMonth[m]; d++){
          for(var h = 0; h < 24; h++){
              
              var hour = days*24 + d*24 + h
              hourlyProfiles[m][h] += outputs.dc[hour] / 1000 / daysInMonth[m];
          }
      }
      days += daysInMonth[m]
  }

  let yearlyAvg = [];
  yearlyAvg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  // create yearly average
  for(let m = 0; m < 12; m++){
      for(let h = 0; h < 24; h++){
          yearlyAvg[h] += hourlyProfiles[m][h] / 12;
      }
  }

  hourlyProfiles.push(yearlyAvg);

  // round hourlyProfiles to 2 digits
  // only used to check math. hourlySum shouuld equal solarProducedDaily
  for(let m = 0; m < 13; m++){
          for(let h = 0; h < 24; h++){
              // hourlySum[m] += hourlyProfiles[m][h];
              hourlyProfiles[m][h] = Math.round(hourlyProfiles[m][h] * 100) / 100;
          }
          // hourlySum[m] = Math.round(hourlySum[m] * 100) / 100;
  }

  return {hourlyProfiles, hourlySum}
}

export const formatMoney = (amount) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  // if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount);
}