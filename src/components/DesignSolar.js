import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';

import MonthlySolarChart from './MonthlySolarChart'
import { round } from '../utils';

class DesignSolar extends React.Component {
  state = { month: 0 }

  handleChange = (e) => {
    const name = e.target.name;
    const value = Number(e.target.value);
    this.setState({ [name]: value });
  }

  render() {
    return (
      <DesignContextConsumer>
        {(value) => {
          const design = value.designData;
          // create lables array
          const labelsMonthly = design.months;
          // create datasets array
          const datasetsMonthly = [
            {
              label: "Load",
              data: design.loadMonthly.map((item) => round(item, 0)),
              type: "scatter",
              fill: "false",
              pointStyle: "line",
              radius: 12,
              hoverRadius: 10,
              pointBorderWidth: 4,
              hoverBorderWidth: 3,
              borderColor: 'black',
              showLine: false,
            },
            {
              label: "Solar Used by Load",
              data: design.solarUsableLoadMonthly.map((item) => round(item, 0)),
              // backgroundColor: ['rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)',],
              backgroundColor: Array(12).fill('rgba(51, 204, 51, 0.7)'),
              borderColor: Array(12).fill('rgba(255, 255, 255, 1.0)'),
              borderWidth: 1,
            },
            {
              label: "Grid Used by Load",
              data: design.gridUsedMonthly.map((item) => round(item, 0)),
              backgroundColor: Array(12).fill('rgba(255, 153, 51, 0.7)'),
              borderColor: Array(12).fill('rgba(255, 255, 255, 1.0)'),
              borderWidth: 1,
            },
            {
              label: "Solar Usable for Sellback",
              data: design.solarUsableForSellbackMonthly.map((item) => round(item, 0)),
              backgroundColor: Array(12).fill('rgba(51, 204, 51, 0.4)'),
              borderColor: Array(12).fill('rgba(255, 255, 255, 1.0)'),
              borderWidth: 1,
            },
          ];
          // create options object
          const optionsMonthly = {
            title: {
              display: false,
              text: "Solar Energy Production"
            },

            legend: {
              display: true,
              position: "top",
              reverse: true,
              labels: {
                boxWidth: 20
              }
            },
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: "Energy (kWh)"
                }
              }]
            }
          }

          // for #2 monthly chart
          // create lables array
          const labelsMonthly2 = design.months;
          // create datasets array
          const datasetsMonthly2 = [
            {
              label: "Solar Produced",
              data: design.solarProducedMonthly.map((item) => round(item, 0)),
              type: "scatter",
              fill: "false",
              pointStyle: "line",
              radius: 12,
              hoverRadius: 10,
              pointBorderWidth: 4,
              hoverBorderWidth: 3,
              borderColor: 'black',
              showLine: false,
            },
            {
              label: "Solar Usable by Load",
              data: design.solarUsableLoadMonthly.map((item) => round(item, 0)),
              // backgroundColor: ['rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)','rgba(51, 204, 51, 0.6)',],
              backgroundColor: Array(12).fill('rgba(51, 204, 51, 0.7)'),
              borderColor: Array(12).fill('rgba(255, 255, 255, 1.0)'),
              borderWidth: 1,
            },
            {
              label: "Solar Usable for Sellback",
              data: design.solarUsableForSellbackMonthly.map((item) => round(item, 0)),
              backgroundColor: Array(12).fill('rgba(51, 204, 51, 0.4)'),
              borderColor: Array(12).fill('rgba(255, 255, 255, 1.0)'),
              borderWidth: 1,
            },
            {
              label: "System Losses",
              data: design.solarLossesMonthly.map((item) => round(item, 0)),
              backgroundColor: Array(12).fill('rgba(204, 51, 255, 0.6)'),
              borderColor: Array(12).fill('rgba(255, 255, 255, 1.0)'),
              borderWidth: 1,
            },
            {
              label: "Solar Efficiency Losses (14%)",
              data: design.solarProducedMonthly.map((item) => round(item / 0.86 - item, 0)),
              backgroundColor: Array(12).fill('rgba(204, 51, 255, 0.4)'),
              borderColor: Array(12).fill('rgba(255, 255, 255, 1.0)'),
              borderWidth: 1,
            },
          ];
          // create options object
          const optionsMonthly2 = {
            title: {
              display: false,
              text: "Put Title Here"
            },

            legend: {
              display: true,
              position: "top",
              reverse: true,
              labels: {
                boxWidth: 20
              }
            },
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true,
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: "Energy (kWh)"
                }
              }]
            }
          }

          // for hourly chart
          // create lables array
          const labelsHourly = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
          // create datasets array
          const datasetsHourly = [
            {
              label: "Solar Power (W)",
              data: design.hourlyProfiles[this.state.month],
              type: "scatter",
              backgroundColor: 'rgba(255, 255, 0, 0.6)',
              borderColor: 'rgba(51, 204, 51, 0.7)',
              fill: true,
              pointBackgroundColor: "white",
            },
          ];
          // create options object
          const optionsHourly = {
            title: {
                display: true,
                text: `Solar Energy Produced on an average day during ${design.months[this.state.month] ? design.months[this.state.month] : "the year"}`
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time of Day'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Power (kW)'
                    }
                }]
            }
        }

          return (
            <div className="mb-4 max-900">
              <p className="content-h5 text-center">Solar Energy Production & Losses</p>
              <MonthlySolarChart id="monthlySolarChart"  type="bar" labels={labelsMonthly2} datasets={datasetsMonthly2} options={optionsMonthly2} update={false} />
              <p className="content-h5 text-center">Load Energy: Solar vs Grid</p>
              <MonthlySolarChart id="monthlyLoadChart"  type="bar" labels={labelsMonthly} datasets={datasetsMonthly} options={optionsMonthly} update={false} />
              <p className="content-h5 text-center">Solar Production Daily</p>
              <div className="form-group max-160 m-auto d-flex flex-column">
                <label htmlFor="monthSelect" className="m-auto">Select a Month:</label>
                <select
                  className="btn btn-secondary"
                  id="monthSelect"
                  value={this.state.month}
                  onChange={this.handleChange}
                  name="month"
                >
                  <option value="0">January</option>
                  <option value="1">February</option>
                  <option value="2">March</option>
                  <option value="3">April</option>
                  <option value="4">May</option>
                  <option value="5">June</option>
                  <option value="6">July</option>
                  <option value="7">August</option>
                  <option value="8">September</option>
                  <option value="9">October</option>
                  <option value="10">November</option>
                  <option value="11">December</option>
                  <option value="12">Annual Average</option>
                </select>
              </div>
              <MonthlySolarChart id="dailyProfileChart" type="line" labels={labelsHourly} datasets={datasetsHourly} options={optionsHourly} update={true} />
            </div>
          )
        }}
      </DesignContextConsumer>
    );
  }

};

export default DesignSolar;