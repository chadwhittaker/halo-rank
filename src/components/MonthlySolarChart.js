import React, { Component } from 'react';
import Chart from 'chart.js'

let myChart;

class MonthlySolarChart extends Component {

  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    if (this.props.update) {
      myChart.destroy();
      this.buildChart();
    }
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");

    myChart = new Chart(myChartRef, {
      type: this.props.type,
      data: {
        // bring in data
        labels: this.props.labels,
        datasets: this.props.datasets,
      },
      options: this.props.options,
    });

    console.log(`${this.props.id} chart built`)

  }

  render() {
    return (
      <div>
        <canvas id={this.props.id} ref={this.chartRef}/>
      </div>
    );
  }
}

export default MonthlySolarChart;