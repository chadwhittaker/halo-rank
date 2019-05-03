import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';

import LoadFormSummary from '../components/LoadFormSummary';


class DesignLoad extends React.Component {
  state = {
    loads: this.props.loads,
  }

  handleLoadChange = async (e, index, updateLoadParams) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;
    const val = type === 'checkbox' ? e.target.checked : value;
    await this.setState((prevState) => {
      // copy the previous state for "loads" 
      const loads = [...prevState.loads];
      // update the loads array with new value
      loads[index][name] = val;
      // return new loads object with updated load
      return { loads };
    })
    // use this to update loads everytime they click the checkbox
    // updateLoadParams(this.state.loads)
  }

  updateLoads = (updateLoadParams) => {
    updateLoadParams(this.state.loads)
  }

  renderLoads = (loads, updateLoadParams) => {
    return (
      loads.map((load, index) => {
        return (
          <tr key={load.id}>
            <td>{load.name}</td>
            <td>{load.quantity}</td>
            <td>{load.power}</td>
            <td>{load.dayUsage}</td>
            <td>{load.nightUsage}</td>
            <td>{load.usageDays}</td>
            <td>{load.surgeMult}</td>
            <td>
              <div className="form-check">
                <input
                  defaultChecked={load.crit === true}
                  onChange={(e) => this.handleLoadChange(e, index, updateLoadParams)}
                  name="crit"
                  type="checkbox"
                  className="form-check-input"
                  id={load.id}
                />
              </div>
            </td>
          </tr>
        )
      })
    )
  }

  render() {
    return (
      <DesignContextConsumer>
        {(value) => {
          return (
            <div className="mb-4">
              <p className="content-h5">Load Devices</p>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col"># of</th>
                    <th scope="col">Power (W)</th>
                    <th scope="col">Day Usage (hr)</th>
                    <th scope="col">Night Usage (hr)</th>
                    <th scope="col">Usage Days</th>
                    <th scope="col">Surge Multiplier</th>
                    <th scope="col">Critical?</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderLoads(this.state.loads, value.updateLoadParams)}
                </tbody>
              </table>
              <div className="text-right">
                <button onClick={() => this.updateLoads(value.updateLoadParams)} type="button" className="btn btn-sm btn-danger">Update Design</button>
              </div>
              <LoadFormSummary loads={this.state.loads} />
            </div>
          )
        }}
      </DesignContextConsumer>
    );
  }
};

export default DesignLoad;