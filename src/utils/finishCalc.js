

export default function finishCalc(nrel, {
  solarWhrNeededLoad,
  solarWhrNeededBat,
  inverter,
  battery,
  charger,
  inputs,
  days_on,
  daily_energy_wh,
}) {
  // =====================================================
  // 1. grab monthly solar produced data from NREL
  // ======================================================
  // everything based off this will be in kW
  const solarProducedMonthly = nrel.data.outputs.dc_monthly;

  // =====================================================
  // 2. calculate daily solar produced
  // ======================================================
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const solarProducedDaily = [];
  for (let i = 0; i < daysInMonth.length; i++) {
    solarProducedDaily[i] = solarProducedMonthly[i] / daysInMonth[i];
  }

  // =====================================================
  // 3. calculate solar allocation
  // ======================================================

  // energy allocation per day, on a monthly basis
  // this is for an ON DAY
  const solarProducedForLoad = [];
  const solarProducedForBat = [];
  const solarProducedExcessDaily = [];
  for (let i = 0; i < daysInMonth.length; i++) {
    // allocate energy to loads first
    solarProducedForLoad[i] = solarWhrNeededLoad / 1000;

    // any energy left goes to the battery, solar produced for the battery will fluctuate based on month, cap the allocation to the solarWhrNeededBat
    solarProducedForBat[i] = Math.min((solarProducedDaily[i] - solarProducedForLoad[i]), (solarWhrNeededBat / 1000));

    // calculate leftover (if any)
    solarProducedExcessDaily[i] = solarProducedDaily[i] - solarProducedForLoad[i] - solarProducedForBat[i];
  }

  // =====================================================
  // 4. calculate usable solar energy & losses
  // ======================================================

  // average day for each month (arrays of 12)
  const solarUsableForDayLoad = [];
  const solarUsableForNightLoad = [];
  const solarUsableForSellback = [];
  const solarUsableForSellbackOffDay = [];
  const solarLosses = [];
  const solarLossesOffDay = [];

  if (!inverter.ACinverter) {
    // if DC solar charger needed (Outback Solution)
    for (let i = 0; i < daysInMonth.length; i++) {
      solarUsableForDayLoad[i] = solarProducedForLoad[i] * charger.eff * inverter.eff * inputs.param_condEff;
      solarUsableForNightLoad[i] = Math.min(solarProducedForBat[i] * charger.eff * battery.eff * inverter.eff * inputs.param_condEff, battery.energyFull / 1000 * inverter.eff * inputs.param_condEff);
      solarUsableForSellback[i] = solarProducedExcessDaily[i] * charger.eff * inverter.eff * inputs.param_condEff;
      solarUsableForSellbackOffDay[i] = solarProducedDaily[i] * charger.eff * inverter.eff * inputs.param_condEff;
      // whatever was not used gets counted as losses
      solarLosses[i] = solarProducedDaily[i] - solarUsableForDayLoad[i] - solarUsableForNightLoad[i] - solarUsableForSellback[i];
      solarLossesOffDay[i] = solarProducedDaily[i] - solarUsableForSellbackOffDay[i];
    }
  } else {
    // if AC solar charger needed (SMA Solution)
    for (let i = 0; i < daysInMonth.length; i++) {
      solarUsableForDayLoad[i] = solarProducedForLoad[i] * charger.eff * inputs.param_condEff;
      solarUsableForNightLoad[i] = Math.min(solarProducedForBat[i] * charger.eff * inverter.eff * battery.eff * inverter.eff * inputs.param_condEff, battery.energyFull / 1000 * inverter.eff * inputs.param_condEff);
      solarUsableForSellback[i] = solarProducedExcessDaily[i] * charger.eff * inputs.param_condEff;
      solarUsableForSellbackOffDay[i] = solarProducedDaily[i] * charger.eff * inverter.eff * inputs.param_condEff;
      // whatever was not used gets counted as losses
      solarLosses[i] = solarProducedDaily[i] - solarUsableForDayLoad[i] - solarUsableForNightLoad[i] - solarUsableForSellback[i];
      solarLossesOffDay[i] = solarProducedDaily[i] - solarUsableForSellbackOffDay[i];
    }
  }

  // =====================================================
  // 5. use the daily data to produce monthly data
  // ======================================================

  // totals for each month (arrays of 12)
  const solarUsableLoadMonthly = [];
  const solarUsableForSellbackMonthly = [];
  const solarLossesMonthly = [];
  const loadMonthly = [];
  const gridUsedMonthly = [];

  for (let i = 0; i < daysInMonth.length; i++) {
    solarUsableLoadMonthly[i] = (solarUsableForDayLoad[i] + solarUsableForNightLoad[i]) * daysInMonth[i] * days_on / 7;
    solarUsableForSellbackMonthly[i] = (solarUsableForSellback[i] * daysInMonth[i] * days_on / 7) + (solarUsableForSellbackOffDay[i] * daysInMonth[i] * (7-days_on) / 7);
    solarLossesMonthly[i] = (solarLosses[i] * daysInMonth[i] * days_on / 7) + (solarLossesOffDay[i] * daysInMonth[i] * (7-days_on) / 7)
    loadMonthly[i] = daily_energy_wh / 1000 * daysInMonth[i] * days_on / 7;
    gridUsedMonthly[i] = loadMonthly[i] - solarUsableLoadMonthly[i];
  }


  // =====================================================
  // 6. use the monthly data to produce annual data
  // ======================================================

  // const solarUsableLoadMonthlySum = solarUsableLoadMonthly.reduce((sum, val) => sum + val, 0)
  // const solarUsableForSellbackMonthlySum =solarUsableForSellbackMonthly.reduce((sum, val) => sum + val, 0)
  // const solarLossesMonthlySum = solarLossesMonthly.reduce((sum, val) => sum + val, 0)
  // const loadMonthlySum = loadMonthly.reduce((sum, val) => sum + val, 0)
  // const gridUsedMonthlySum = gridUsedMonthly.reduce((sum, val) => sum + val, 0)

  // =====================================================
  // 7. use the monthly data to produce annual data
  // ======================================================

  // solarUsableLoadMonthly
  // solarUsableForSellbackMonthly
  // solarLossesMonthly
  // loadMonthly
  // gridUsedMonthly






  return {
    solarProducedMonthly,
    solarProducedDaily,
    daysInMonth,
    months,
    // daily averages for each month (arrays of 12)
    solarProducedForLoad,
    solarProducedForBat,
    solarProducedExcessDaily,
    solarUsableForDayLoad,
    solarUsableForNightLoad,
    solarUsableForSellback,
    solarLosses,
    // monthly averages for each month (arrays of 12)
    solarUsableLoadMonthly,
    solarUsableForSellbackMonthly,
    solarLossesMonthly,
    loadMonthly,
    gridUsedMonthly,

  }
}