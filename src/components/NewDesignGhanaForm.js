import React, { Component } from 'react';
import LoadFormSummary from './LoadFormSummary';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from './ErrorMessage';

const CREATE_DESIGN_MUTATION = gql`
  mutation CREATE_DESIGN_MUTATION(
    $deanery: String!, 
    $location: String!, 
    $parish: String!,
    $longitude: Float,
    $longitudeDir: String,
    $latitude: Float,
    $latitudeDir: String,
    $gridTied: String,
    $generator: String,
    $voltage: String,
    $freq: String,
    $phase: String,
    $area_roof: Float,
    $area_ground: Float,
    $loads: [LoadCreateWithoutDesignInput!]!,
    ) {
  createDesign(
    deanery: $deanery
    location: $location
    parish: $parish
    longitude: $longitude
    longitudeDir: $longitudeDir
    latitude: $latitude
    latitudeDir: $latitudeDir
    gridTied: $gridTied
    generator: $generator
    voltage: $voltage
    freq: $freq
    phase: $phase
    area_roof: $area_roof
    area_ground: $area_ground
    loads: $loads
  ) {
    id
    createdAt
    updatedAt
    modified
    deanery
    location
    parish
    loads {
      name
      quantity
      power
    }
  }
}
`

class NewDesignGhanaForm extends Component {
  state = {
    deanery: "Accra",
    location: "",
    parish: "",
    longitude: 0,
    longitudeDir: "N",
    latitude: 0,
    latitudeDir: "E",
    gridTied: "Yes",
    generator: "No",
    voltage: "230",
    freq: "50",
    phase: "Single",
    area_roof: 0,
    area_ground: 0,
    loads: [{
      name: "",
      quantity: 1,
      power: 0,
      dayUsage: 1,
      nightUsage: 1,
      usageDays: 1,
      surgeMult: 1
    }],
  }

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    // if its a number turn the string into a number
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  handleLoadChange = (e, index) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;
    // if its a number turn the string into a number
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState((prevState) => {
      // copy the previous state for "loads" 
      const loads = [...prevState.loads];
      // update the loads array with new value
      loads[index][name] = val;
      // return new loads object with updated load
      return { loads: loads };
    })
  }

  addLoad = (e) => {
    e.preventDefault();
    const newLoad = {
      name: "",
      quantity: 1,
      power: 0,
      dayUsage: 1,
      nightUsage: 1,
      usageDays: 1,
      surgeMult: 1
    };

    // add a new load object to state
    this.setState({ loads: [...this.state.loads, newLoad] });
  }

  deleteLoad = (e) => {
    e.preventDefault();
    // copy the prev state
    const prevState = [...this.state.loads];
    // get index of last element in the array
    const index = prevState.length - 1;
    // create a new array with last element filtered out
    const newState = this.state.loads.filter((load, i) => i !== index)
    // set state to new array
    this.setState({ loads: newState });
  }

  renderLoads = () => {
    return (
      this.state.loads.map((load, index) => {
        return (
          <div key={index} className="form-group row d-flex flex-nowrap">
            <div className="mx-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].name}
                name="name"
                type="text"
                className="form-control"
                placeholder="Load Name"
              />
            </div>
            <div className="mx-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].quantity}
                name="quantity"
                type="number"
                min="0"
                step="1"
                className="form-control"
                required
              />
            </div>
            <div className="mx-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].power}
                name="power"
                type="number"
                min="0"
                step="1"
                className="form-control"
                required
              />
            </div>
            <div className="mx-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].dayUsage}
                name="dayUsage"
                type="number"
                min="0"
                step="1"
                className="form-control"
                required
              />
            </div>
            <div className="mx-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].nightUsage}
                name="nightUsage"
                type="number"
                min="0"
                step="1"
                className="form-control"
                required
              />
            </div>
            <div className="mx-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].usageDays}
                name="usageDays"
                type="number"
                min="0"
                step="1"
                className="form-control"
                required
              />
            </div>
            <div className="mx-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].surgeMult}
                name="surgeMult"
                type="number"
                min="1"
                step="0.1"
                className="form-control"
                required
              />
            </div>
          </div>
        )
      })
    )
  }

  onSubmit = (e, createDesign) => {
    e.preventDefault();

    createDesign();
  }

  render() {
    return (
      <Mutation mutation={CREATE_DESIGN_MUTATION} variables={this.state}>
        {(createDesign, { error, loading }) => (
          <div id="newGhanaDesignFormContainer" className="container max-900">
            <h3 className="lead text-center mt-4">New Design Form - Ghana</h3>
            <div id="newDesignFormDiv">
              <form onSubmit={(e) => this.onSubmit(e, createDesign)} id="newGhanaDesignForm" className="">
                <ErrorMessage error={error} />
                <h4 className="design-form-title">Location Information:</h4>
                <div className="form-group row">
                  <label className="col-4 col-form-label max-200" htmlFor="inputDean">Deanery</label>
                  <div className="col">
                    <select value={this.state.deanery} onChange={this.handleChange} name="deanery" id="inputDean" className="form-control">
                      <option>Accra</option>
                      <option>Keta-Akatsi</option>
                      <option>Kumasi</option>
                      <option>Tamale</option>
                      <option>Techiman</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label max-200" htmlFor="inputLocation">Location</label>
                  <div className="col">
                    <input
                      value={this.state.location}
                      onChange={this.handleChange}
                      name="location"
                      type="text"
                      className="form-control"
                      id="inputLocation"
                      placeholder="Location"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label max-200" htmlFor="inputParish">Parish</label>
                  <div className="col">
                    <input
                      value={this.state.parish}
                      onChange={this.handleChange}
                      name="parish"
                      type="text"
                      className="form-control"
                      id="inputParish"
                      placeholder="Parish"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label max-200" htmlFor="inputLong">Coordinates</label>
                  <div className="col d-flex justify-start">
                    <input
                      value={this.state.longitude}
                      onChange={this.handleChange}
                      name="longitude"
                      type="number"
                      step="0.01"
                      min="0"
                      max="90"
                      className="form-control d-inline-flex"
                      id="inputLong"
                      placeholder="Longitude (deg)"
                    />
                    <div className="form-check form-check-inline mx-1">
                      <input
                        checked={this.state.longitudeDir === "N"}
                        onChange={this.handleChange}
                        name="longitudeDir"
                        value="N"
                        type="radio"
                        className="form-check-input"
                        id="lonRadioN"
                      />
                      <label className="form-check-label" htmlFor="lonRadioN">N</label>
                    </div>
                    <div className="form-check form-check-inline ml-0">
                      <input
                        checked={this.state.longitudeDir === "S"}
                        onChange={this.handleChange}
                        name="longitudeDir"
                        value="S"
                        type="radio"
                        className="form-check-input"
                        id="lonRadioS"
                      />
                      <label className="form-check-label" htmlFor="lonRadioS">S</label>
                    </div>
                    <input
                      value={this.state.latitude}
                      onChange={this.handleChange}
                      name="latitude"
                      type="number"
                      step="0.01"
                      min="0"
                      max="180"
                      className="form-control d-inline-flex ml-2"
                      id="inputLat"
                      placeholder="Latitude (deg)"
                    />
                    <div className="form-check form-check-inline mx-1">
                      <input
                        checked={this.state.latitudeDir === "E"}
                        onChange={this.handleChange}
                        value="E"
                        className="form-check-input"
                        type="radio"
                        name="latitudeDir"
                        id="latRadioE"
                      />
                      <label className="form-check-label" htmlFor="latRadioE">E</label>
                    </div>
                    <div className="form-check form-check-inline mx-0">
                      <input
                        checked={this.state.latitudeDir === "W"}
                        onChange={this.handleChange}
                        value="W"
                        name="latitudeDir"
                        className="form-check-input"
                        type="radio"
                        id="latRadioW"
                      />
                      <label className="form-check-label" htmlFor="latRadioW">W</label>
                    </div>
                  </div>
                </div>
                <h4 className="design-form-title">Electrical Details:</h4>
                <div className="form-group row">
                  <legend className="col-4 col-form-label max-200 pt-0">Grid Tied?</legend>
                  <div className="col">
                    <div className="form-check form-check-inline">
                      <input
                        checked={this.state.gridTied === "Yes"}
                        onChange={this.handleChange}
                        value="Yes"
                        name="gridTied"
                        className="form-check-input"
                        type="radio"
                        id="gridRadioYes"
                      />
                      <label className="form-check-label" htmlFor="gridRadioYes">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        checked={this.state.gridTied === "No"}
                        onChange={this.handleChange}
                        value="No"
                        name="gridTied"
                        className="form-check-input"
                        type="radio"
                        id="gridRadioNo"
                      />
                      <label className="form-check-label" htmlFor="gridRadioNo">No</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <legend className="col-4 col-form-label max-200 pt-0">Working Generator?</legend>
                  <div className="col">
                    <div className="form-check form-check-inline">
                      <input
                        checked={this.state.generator === "Yes"}
                        onChange={this.handleChange}
                        value="Yes"
                        name="generator"
                        className="form-check-input"
                        type="radio"
                        id="genRadioYes"
                      />
                      <label className="form-check-label" htmlFor="genRadioYes">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        checked={this.state.generator === "No"}
                        onChange={this.handleChange}
                        value="No"
                        name="generator"
                        className="form-check-input"
                        type="radio"
                        id="genRadioNo"
                      />
                      <label className="form-check-label" htmlFor="genRadioNo">No</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <legend className="col-4 col-form-label max-200">Voltage</legend>
                  <div className="col">
                    <div className="form-check form-check-inline">
                      <input
                        checked={this.state.voltage === "230"}
                        onChange={this.handleChange}
                        value="230"
                        name="voltage"
                        className="form-check-input"
                        type="radio"
                        id="voltRadio230"
                      />
                      <label className="form-check-label" htmlFor="voltRadio230">230V</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        checked={this.state.voltage === "other"}
                        onChange={this.handleChange}
                        value="other"
                        name="voltage"
                        className="form-check-input"
                        type="radio"
                        id="voltRadioOther"
                      />
                      <label className="form-check-label" htmlFor="voltRadioOther">Other</label>
                    </div>
                    <div className="d-inline-flex">
                      <input type="text" className="form-control" id="voltOther" placeholder="..." disabled />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <legend className="col-4 col-form-label max-200">Frequency</legend>
                  <div className="col">
                    <div className="form-check form-check-inline">
                      <input
                        checked={this.state.freq === "50"}
                        onChange={this.handleChange}
                        value="50"
                        name="freq"
                        className="form-check-input"
                        type="radio"
                        id="freqRadio50"
                      />
                      <label className="form-check-label" htmlFor="freqRadio50">50 Hz</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        checked={this.state.freq === "other"}
                        onChange={this.handleChange}
                        value="other"
                        name="freq"
                        className="form-check-input"
                        type="radio"
                        id="freqRadioOther"
                      />
                      <label className="form-check-label" htmlFor="freqRadioOther">Other</label>
                    </div>
                    <div className="d-inline-flex">
                      <input type="text" className="form-control" id="freqOther" placeholder="..." disabled />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <legend className="col-4 col-form-label max-200 pt-0">Phase</legend>
                  <div className="col">
                    <div className="form-check form-check-inline">
                      <input
                        checked={this.state.phase === "Single"}
                        onChange={this.handleChange}
                        value="Single"
                        name="phase"
                        className="form-check-input"
                        type="radio"
                        id="phaseRadio1"
                      />
                      <label className="form-check-label" htmlFor="phaseRadio1">Single</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        checked={this.state.phase === "Three"}
                        onChange={this.handleChange}
                        value="Three"
                        name="phase"
                        className="form-check-input"
                        type="radio"
                        id="phaseRadio3"
                      />
                      <label className="form-check-label" htmlFor="phaseRadio3">Three</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label pt-0 max-200" htmlFor="area_roof">Area Available for Solar Panels</label>
                  <div className="col d-flex">
                    <input
                      value={this.state.area_roof}
                      onChange={this.handleChange}
                      name="area_roof"
                      type="number"
                      min="0"
                      className="form-control"
                      id="area_roof"
                      placeholder="Roof"
                    />
                    <div className="d-inline-flex ml-1 pt-2">
                      ft<sup>2</sup>
                    </div>
                  </div>
                  <div className="col d-flex">
                    <input
                      value={this.state.area_ground}
                      onChange={this.handleChange}
                      name="area_ground"
                      type="number"
                      min="0"
                      className="form-control"
                      id="area_ground"
                      placeholder="Ground"
                    />
                    <div className="d-inline-flex ml-1 pt-2">
                      ft<sup>2</sup>
                    </div>
                  </div>
                </div>
                <h4 className="design-form-title">Load Details:</h4>
                <div className="form-group row">
                  <div className="mx-1 p-0 col text-center">
                    <p className="m-0 pt-1">Name</p>
                  </div>
                  <div className="mx-1 p-0 col text-center">
                    <p className="m-0 pt-1 "># of</p>
                  </div>
                  <div className="mx-1 p-0 col text-center">
                    <p className="m-0 pt-1">Power (W)</p>
                  </div>
                  <div className="mx-1 p-0 col text-center">
                    <p className="m-0 pt-1">Day Usage (hr)</p>
                  </div>
                  <div className="mx-1 p-0 col text-center">
                    <p className="m-0 pt-1">Night Usage (hr)</p>
                  </div>
                  <div className="mx-1 p-0 col text-center">
                    <p className="m-0 pt-1">Usage Days / Week</p>
                  </div>
                  <div className="mx-1 p-0 col text-center">
                    <p className="m-0 pt-1">Surge Multiplier</p>
                  </div>
                </div>
                {this.renderLoads()}
                <div className="text-center mt-4">
                  <button onClick={this.addLoad} className="btn btn-success">Add Load</button>
                  <button onClick={this.deleteLoad} className="btn btn-danger ml-2">Remove Load</button>
                </div>
                <h4 className="design-form-title">Load Summary:</h4>
                <LoadFormSummary loads={this.state.loads} />
                <ErrorMessage error={error} />
                <div className="text-center my-4">
                  <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}



export default NewDesignGhanaForm;