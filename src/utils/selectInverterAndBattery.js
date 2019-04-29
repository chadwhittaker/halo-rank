import { panels, inverters, batteries, chargers } from './parts';

export default function selectInverterAndBattery(inputs) {
  // deanery
  // location
  // parish
  // longitude
  // longitudeDir
  // latitude
  // latitudeDir
  // gridTied
  // generator
  // voltage
  // freq
  // phase
  // area_roof
  // area_ground
  // loads {
  //   id
  //   name
  //   quantity
  //   power
  //   dayUsage
  //   nightUsage
  //   usageDays
  //   surgeMult      
  // }

  console.log("queryData", inputs)

  // define outputs object
  const o = {
    inputs: inputs,
    panel: {},
    inverter: {},
    battery: {},
    charger: {},
    day_energy_wh: null,
    night_energy_wh: null,
    daily_energy_wh: null,
    weekly_energy_wh: null,
    peak_load_w: null,
    peak_surge_w: null,

  }

  // default parts to blank
  o.panel = {...panels[0]};
  o.inverter = {...inverters[0]};
  o.battery = {...batteries[0]};
  o.charger = {...chargers[0]};

  const autoDays = inputs.param_autoHours/24;

  // calculate loads
  o.day_energy_wh = inputs.loads.reduce((sum, load) => sum + (load.quantity * load.power * load.dayUsage), 0);
  o.night_energy_wh = inputs.loads.reduce((sum, load) => sum + (load.quantity * load.power * load.nightUsage), 0);
  o.daily_energy_wh = o.day_energy_wh + o.night_energy_wh;
  o.weekly_energy_wh = inputs.loads.reduce((sum, load) => sum + (load.quantity * load.power * (load.dayUsage + load.nightUsage) * load.usageDays), 0);
  o.peak_load_w = inputs.loads.reduce((sum, load) => sum + load.quantity * load.power, 0);
  o.peak_surge_w = inputs.loads.reduce((sum, load) => sum + load.quantity * load.power * load.surgeMult, 0);
  let days_on = o.weekly_energy_wh / o.daily_energy_wh;
  days_on = !days_on  ? 0 : days_on;









  return o
}