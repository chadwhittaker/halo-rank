import React, { Component } from 'react';

class LoadFormSummary extends Component {

  render() {
    if(!this.props.loads) return <div className="text-center">No details available</div>
    // calculate totals based on passed in props
    const day_energy_wh = this.props.loads.reduce((sum, load) => sum + (load.quantity * load.power * load.dayUsage), 0);
    const night_energy_wh = this.props.loads.reduce((sum, load) => sum + (load.quantity * load.power * load.nightUsage), 0);
    const daily_energy_wh = day_energy_wh + night_energy_wh;
    const weekly_energy_wh = this.props.loads.reduce((sum, load) => sum + (load.quantity * load.power * (load.dayUsage + load.nightUsage) * load.usageDays), 0);
    const peak_load_w = this.props.loads.reduce((sum, load) => sum + load.quantity * load.power, 0);
    const peak_surge_w = this.props.loads.reduce((sum, load) => sum + load.quantity * load.power * load.surgeMult, 0);
    let days_on = weekly_energy_wh / daily_energy_wh;
    days_on = !days_on  ? 0 : days_on;

    return (
      <div id="loadSummaryDiv" className="mt-3">
        <div className="d-flex justify-content-center">
          <div className="load-summary-title">Day Energy</div>
          <div className="load-summary-detail">{day_energy_wh}</div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="load-summary-title">Night Energy</div>
          <div className="load-summary-detail">{night_energy_wh}</div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="load-summary-title">Total Daily Energy</div>
          <div className="load-summary-detail">{daily_energy_wh}</div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="load-summary-title">Weekly Energy</div>
          <div className="load-summary-detail">{weekly_energy_wh}</div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="load-summary-title">Days On</div>
          <div className="load-summary-detail">{days_on}</div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="load-summary-title">Peak Power (W)</div>
          <div className="load-summary-detail">{peak_load_w}</div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="load-summary-title">Peak Surge (W)</div>
          <div className="load-summary-detail">{peak_surge_w}</div>
        </div>
      </div>
    );
  }
}

export default LoadFormSummary;