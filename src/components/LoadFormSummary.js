import React, { Component } from 'react';
import { wtokwUp, wtokwUp0, round } from '../utils'

class LoadFormSummary extends Component {

  render() {
    if (!this.props.loads) return <div className="text-center">No details available</div>
    // calculate totals based on passed in props
    let day_energy_wh = this.props.loads.reduce((sum, load) => load.crit ? sum + (load.quantity * load.power * load.dayUsage) : sum, 0);
    let night_energy_wh = this.props.loads.reduce((sum, load) => load.crit ? sum + (load.quantity * load.power * load.nightUsage) : sum, 0);
    let daily_energy_wh = day_energy_wh + night_energy_wh;
    let weekly_energy_wh = this.props.loads.reduce((sum, load) => load.crit ? sum + (load.quantity * load.power * (load.dayUsage + load.nightUsage) * load.usageDays) : sum, 0);
    let peak_load_w = this.props.loads.reduce((sum, load) => load.crit ? sum + load.quantity * load.power : sum, 0);
    let peak_surge_w = this.props.loads.reduce((sum, load) => load.crit ? sum + load.quantity * load.power * load.surgeMult : sum, 0);

    let daily_energy_average_wh = weekly_energy_wh / 7;
    let yearly_energy_average_wh = daily_energy_average_wh * 365;
    let monthly_energy_average_wh = yearly_energy_average_wh / 12;

    let days_on = weekly_energy_wh / daily_energy_wh;
    days_on = !days_on ? 0 : days_on;

    // take W to kW
    // day_energy_wh = 
    // night_energy_wh = this.props.loads.reduce((sum, load) => load.crit ? sum + (load.quantity * load.power * load.nightUsage) : sum, 0);
    // daily_energy_wh = day_energy_wh + night_energy_wh;
    // weekly_energy_wh = this.props.loads.reduce((sum, load) => load.crit ? sum + (load.quantity * load.power * (load.dayUsage + load.nightUsage) * load.usageDays) : sum, 0);
    // peak_load_w = this.props.loads.reduce((sum, load) => load.crit ? sum + load.quantity * load.power : sum, 0);
    // peak_surge_w = this.props.loads.reduce((sum, load) => load.crit ? sum + load.quantity * load.power * load.surgeMult : sum, 0);

    // daily_energy_average_wh = weekly_energy_wh / 7;
    // yearly_energy_average_wh = daily_energy_average_wh * 365;
    // monthly_energy_average_wh = yearly_energy_average_wh / 12;

    // days_on = weekly_energy_wh / daily_energy_wh;



    return (
      <div id="loadSummaryDiv">

        <div className="d-flex justify-content-around">
          <div>
            <p className="load-summary-head text-center font-italic">Typical Usage Day:</p>
            <div className="card-notebook sticky-note shadow">
              <div className="d-flex justify-content-start">
                <div className="load-summary-title">Day Energy:</div>
                <div className="load-summary-detail">{wtokwUp(day_energy_wh)}</div>
                <div className="load-summary-units">kWhr</div>
              </div>
              <div className="d-flex justify-content-start">
                <div className="load-summary-title">Night Energy:</div>
                <div className="load-summary-detail">{wtokwUp(night_energy_wh)}</div>
                <div className="load-summary-units">kWhr</div>
              </div>
              <hr />
              <div className="d-flex justify-content-start">
                <div className="load-summary-title">Total Daily Energy:</div>
                <div className="load-summary-detail">{(Number(wtokwUp(day_energy_wh)) + Number(wtokwUp(night_energy_wh))).toFixed(1)}</div>
                <div className="load-summary-units">kWhr</div>
              </div>
              <hr />
              <div className="d-flex justify-content-start">
                <div className="load-summary-title">Peak Power:</div>
                <div className="load-summary-detail">{wtokwUp(peak_load_w)}</div>
                <div className="load-summary-units">kW</div>
              </div>
              <div className="d-flex justify-content-start">
                <div className="load-summary-title">Peak Surge:</div>
                <div className="load-summary-detail">{wtokwUp(peak_surge_w)}</div>
                <div className="load-summary-units">kW</div>
              </div>
              <hr />
              <div className="d-flex justify-content-start">
                <div className="load-summary-title">Usage Days / Week:</div>
                <div className="load-summary-detail">{round(days_on, 1)}</div>
                <div className="load-summary-units">days</div>
              </div>
            </div>
          </div>
          <div>
            <p className="load-summary-head text-center font-italic">Load Demand Averages</p>
            <div className="card-notebook sticky-note shadow">
              <div className="d-flex justify-content-start">
                <div className="load-summary-title">Weekly Energy:</div>
                <div className="load-summary-detail">{wtokwUp0(weekly_energy_wh)}</div>
                <div className="load-summary-units">kWhr</div>
              </div>
              <hr />
              <div className="d-flex justify-content-start">
                <div className="load-summary-title">Monthly Energy:</div>
                <div className="load-summary-detail">{wtokwUp0(monthly_energy_average_wh)}</div>
                <div className="load-summary-units">kWhr</div>
              </div>
              <hr />
              <div className="d-flex justify-content-start">
                <div className="load-summary-title">Yearly Energy:</div>
                <div className="load-summary-detail">{wtokwUp0(yearly_energy_average_wh)}</div>
                <div className="load-summary-units">kWhr</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadFormSummary;