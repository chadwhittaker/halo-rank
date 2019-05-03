import React, { Component } from 'react';
import LoadFormSummary from './LoadFormSummary';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import history from '../history';

import ErrorMessage from './ErrorMessage';

class DesignEditGhana extends Component {
  state = {
    loads: [],
    images: [],
  };

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
    let val = type === 'number' ? parseFloat(value) : value;
    val = type === 'checkbox' ? e.target.checked : val;
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
      surgeMult: 1,
      crit: true,
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

  // if the "Edit Loads" button is clicked...set state to the design Loads from DB
  editLoadsEnable = (design) => {
    // remove __typename from each load
    const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
    const loads = JSON.parse(JSON.stringify(design.loads), omitTypename)
    // set state to loads from DB
    this.setState({ loads })
  }

  // // either show the "Edit Loads" button or the Loads Form 
  // showLoads = (design) => {
  //   if (!this.state.loads) return (
  //     <div className="text-center">
  //       <button onClick={(e) => this.editLoadsEnable(design)} type="button" className="btn btn-success">Edit Loads</button>
  //       <div className="text-center mt-1">Click to display loads</div>
  //     </div>
  //   )
  //   return (
  //     <>
  //       <div id="loadFormLabels" className="row mx-0 mb-1">
  //         <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
  //           <p className="m-0 pt-1">Name</p>
  //         </div>
  //         <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
  //           <p className="m-0 pt-1 ">Qty</p>
  //         </div>
  //         <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
  //           <p className="m-0 pt-1">Power (W)</p>
  //         </div>
  //         <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
  //           <p className="m-0 pt-1">Day (hr)</p>
  //         </div>
  //         <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
  //           <p className="m-0 pt-1">Night (hr)</p>
  //         </div>
  //         <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
  //           <p className="m-0 pt-1">Days / Week</p>
  //         </div>
  //         <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
  //           <p className="m-0 pt-1">Surge Multiplier</p>
  //         </div>
  //         <div className="critical-column mx-1 p-0 col flex-grow-0 text-center d-flex justify-content-center align-items-end">
  //           <p className="m-0 pt-1">Crit?</p>
  //         </div>
  //       </div>
  //       {this.renderLoads()}
  //       <p className="text-muted text-center font-italic font-small">
  //         Only loads marked "crit" will be included in design calculations
  //       </p>
  //       <div className="text-center mt-4">
  //         <button onClick={this.addLoad} className="btn btn-outline-success">Add Load</button>
  //         <button onClick={this.deleteLoad} className="btn btn-outline-danger ml-2">Remove Load</button>
  //       </div>
  //     </>
  //   )
  // }

  renderLoads = (dbLoads) => {
    // if first pass populate state with loads from db
    if (this.state.loads.length === 0 && dbLoads.length > 0) {
      // remove __typename from each load
      const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
      const loads = JSON.parse(JSON.stringify(dbLoads), omitTypename)
      // set state to loads from DB
      this.setState({ loads })
      return
    }

    return (
      this.state.loads.map((load, index) => {
        return (
          <div key={index} className="form-group row mx-0">
            <div className="mx-1 p-0 col flex-grow-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].name}
                name="name"
                type="text"
                className="form-control form-control-sm"
                placeholder='i.e. "Light"'
              />
            </div>
            <div className="mx-1 p-0 col flex-grow-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].quantity}
                name="quantity"
                type="number"
                min="0"
                step="1"
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="mx-1 p-0 col flex-grow-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].power}
                name="power"
                type="number"
                min="0"
                step="1"
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="mx-1 p-0 col flex-grow-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].dayUsage}
                name="dayUsage"
                type="number"
                min="0"
                step="1"
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="mx-1 p-0 col flex-grow-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].nightUsage}
                name="nightUsage"
                type="number"
                min="0"
                step="1"
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="mx-1 p-0 col flex-grow-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].usageDays}
                name="usageDays"
                type="number"
                min="0"
                step="1"
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="mx-1 p-0 col flex-grow-1">
              <input
                onChange={(e) => { this.handleLoadChange(e, index) }}
                value={this.state.loads[index].surgeMult}
                name="surgeMult"
                type="number"
                min="1"
                step="0.1"
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="form-check form-check-inline mx-1 critical-column mx-1 p-0 col flex-grow-0 justify-content-center">
              <input
                checked={this.state.loads[index].crit === true}
                onChange={(e) => { this.handleLoadChange(e, index) }}
                name="crit"
                type="checkbox"
                className="form-check-input"
              />
            </div>
          </div>
        )
      }
      )
    )
  }

  uploadFile = async (e) => {
    const files = e.target.files;

    // prepare data for Cloudinary
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'AEG-Ghana-Images-Preset');

    // send Cloudinary Post Request
    const res = await fetch('https://api.cloudinary.com/v1_1/cwhit/image/upload', {
      method: 'POST',
      body: data,
    });

    const file = await res.json();

    // if No Error...set State with URL
    if (!file.error && file.secure_url) {
      this.setState((prevState) => {
        // copy the previous array of images, add in the new URL to the end
        const images = [...prevState.images, file.secure_url];
        // set state with the new image array
        return { images };
      });
      return
    }

    if (file.error) {
      alert(file.error.message);
      return
    }

    alert("Something went wrong with image Upload");
    return
  };

  renderImages = (dbImages) => {
    // load state with the images from database on first pass through
    if (dbImages.length !== 0 && this.state.images.length === 0) {
      this.setState({ images: dbImages });
      return;
    }

    if (this.state.images.length === 0 && dbImages.length === 0) return <p className="font-italic text-muted">No images uploaded yet...</p>

    return (
      <div>
        <p className="font-italic">Images Uploaded:</p>
        {this.state.images.map((image) => {
          return <img key={image} width="300" src={image} className="m-1" alt={image} />
        })}
      </div>
    )
  }

  onSubmit = async (e, updateDesign, error) => {
    e.preventDefault();

    const design = await updateDesign({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    if (!error && design.data) {
      const id = design.data.updateDesign.id;
      history.push(`/ghana/designs/${id}`)
    }
  }

  render() {
    return (
      <Query query={DESIGN_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>
          if (!data.design) return <div>No design found for ID</div>
          if (error) return <ErrorMessage error={error} />
          if (data.design) {
            const design = data.design;
            return (
              <Mutation mutation={EDIT_DESIGN_MUTATION}>
                {(updateDesign, { error, loading }) => (
                  <div id="newGhanaDesignFormContainer" className="container max-700 my-4">
                    <h3 className="lead text-center mt-4">Edit Design Form - Ghana</h3>
                    <div id="newDesignFormDiv">
                      <form onSubmit={(e) => this.onSubmit(e, updateDesign, error)} id="newGhanaDesignForm" className="">
                        <ErrorMessage error={error} />
                        <p className="content-h5 mt-0">Location Information:</p>
                        <hr />
                        <div className="form-group">
                          <label className="" htmlFor="inputDean">Deanery</label>
                          <select
                            defaultValue={design.deanery}
                            onChange={this.handleChange}
                            name="deanery"
                            id="inputDean"
                            className="form-control form-control-sm"
                          >
                            <option value="Accra">Accra</option>
                            <option value="Keta-Akatsi">Keta-Akatsi</option>
                            <option value="Kumasi">Kumasi</option>
                            <option value="Tamale">Tamale</option>
                            <option value="Techiman">Techiman</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-sm-6">
                            <label className="" htmlFor="inputLocation">Location</label>
                            <input
                              defaultValue={design.location}
                              onChange={this.handleChange}
                              name="location"
                              type="text"
                              className="form-control form-control-sm"
                              id="inputLocation"
                              placeholder="Location"
                              required
                            />
                          </div>
                          <div className="form-group col-sm-6">
                            <label className="" htmlFor="inputParish">Parish</label>
                            <input
                              defaultValue={design.parish}
                              onChange={this.handleChange}
                              name="parish"
                              type="text"
                              className="form-control form-control-sm"
                              id="inputParish"
                              placeholder="Parish"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col">
                            <label className="" htmlFor="inputLong">Longitude</label>
                            <input
                              defaultValue={design.longitude}
                              onChange={this.handleChange}
                              name="longitude"
                              type="number"
                              step="0.01"
                              min="0"
                              max="90"
                              className="form-control form-control-sm"
                              id="inputLong"
                              placeholder="Longitude (deg)"
                            />
                          </div>
                          <div className="col flex-grow-0">
                            <div className="chad-inline-radio form-check mx-1">
                              <input
                                defaultChecked={design.longitudeDir === "N"}
                                onChange={this.handleChange}
                                name="longitudeDir"
                                value="N"
                                type="radio"
                                className="form-check-input"
                                id="lonRadioN"
                              />
                              <label className="form-check-label" htmlFor="lonRadioN">N</label>
                            </div>
                          </div>
                          <div className="col flex-grow-0">
                            <div className="chad-inline-radio form-check ml-0">
                              <input
                                defaultChecked={design.longitudeDir === "S"}
                                onChange={this.handleChange}
                                name="longitudeDir"
                                value="S"
                                type="radio"
                                className="form-check-input"
                                id="lonRadioS"
                              />
                              <label className="form-check-label" htmlFor="lonRadioS">S</label>
                            </div>
                          </div>
                          <div className="form-group col pl-2">
                            <label className="" htmlFor="inputLat">Latitude</label>
                            <input
                              defaultValue={design.latitude}
                              onChange={this.handleChange}
                              name="latitude"
                              type="number"
                              step="0.01"
                              min="0"
                              max="180"
                              className="form-control form-control-sm"
                              id="inputLat"
                              placeholder="Latitude (deg)"
                            />
                          </div>
                          <div className="col flex-grow-0">
                            <div className="chad-inline-radio form-check mx-1">
                              <input
                                defaultChecked={design.latitudeDir === "E"}
                                onChange={this.handleChange}
                                value="E"
                                className="form-check-input"
                                type="radio"
                                name="latitudeDir"
                                id="latRadioE"
                              />
                              <label className="form-check-label" htmlFor="latRadioE">E</label>
                            </div>
                          </div>
                          <div className="col flex-grow-0">
                            <div className="chad-inline-radio form-check mx-0">
                              <input
                                defaultChecked={design.latitudeDir === "W"}
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
                        <p className="content-h5">Electrical Details:</p>
                        <hr />
                        <div className="form-group">
                          <label className="">Grid Tied?</label>
                          <div className="form-check ml-3">
                            <input
                              defaultChecked={design.gridTied === "Yes"}
                              onChange={this.handleChange}
                              value="Yes"
                              name="gridTied"
                              className="form-check-input"
                              type="radio"
                              id="gridRadioYes"
                            />
                            <label className="form-check-label" htmlFor="gridRadioYes">Yes</label>
                          </div>
                          <div className="form-check ml-3">
                            <input
                              defaultChecked={design.gridTied === "No"}
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
                        <div className="form-group">
                          <label className="">Working Generator?</label>
                          <div className="form-check ml-3">
                            <input
                              defaultChecked={design.generator === "Yes"}
                              onChange={this.handleChange}
                              value="Yes"
                              name="generator"
                              className="form-check-input"
                              type="radio"
                              id="genRadioYes"
                            />
                            <label className="form-check-label" htmlFor="genRadioYes">Yes</label>
                          </div>
                          <div className="form-check ml-3">
                            <input
                              defaultChecked={design.generator === "No"}
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
                        <div className="form-group">
                          <label className="">Voltage</label>
                          <div className="form-check ml-3">
                            <input
                              defaultChecked={design.voltage === "230"}
                              onChange={this.handleChange}
                              value="230"
                              name="voltage"
                              className="form-check-input"
                              type="radio"
                              id="voltRadio230"
                            />
                            <label className="form-check-label" htmlFor="voltRadio230">230V</label>
                          </div>
                          <div className="form-check ml-3">
                            <input
                              defaultChecked={design.voltage === "other"}
                              onChange={this.handleChange}
                              value="other"
                              name="voltage"
                              className="form-check-input"
                              type="radio"
                              id="voltRadioOther"
                            />
                            <label className="form-check-label" htmlFor="voltRadioOther">Other{this.state.voltage === "other" ? <span className="text-danger font-italic ml-3">- Please write voltage in notes</span> : ""}</label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="">Frequency</label>
                          <div className="form-check ml-3">
                            <input
                              defaultChecked={design.freq === "50"}
                              onChange={this.handleChange}
                              value="50"
                              name="freq"
                              className="form-check-input"
                              type="radio"
                              id="freqRadio50"
                            />
                            <label className="form-check-label" htmlFor="freqRadio50">50 Hz</label>
                          </div>
                          <div className="form-check ml-3">
                            <input
                              defaultChecked={design.freq === "other"}
                              onChange={this.handleChange}
                              value="other"
                              name="freq"
                              className="form-check-input"
                              type="radio"
                              id="freqRadioOther"
                            />
                            <label className="form-check-label" htmlFor="freqRadioOther">Other{this.state.freq === "other" ? <span className="text-danger font-italic ml-3">- Please write frequency in notes</span> : ""}</label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="">Phase</label>
                          <div className="form-check ml-3">
                            <input
                              defaultChecked={design.phase === "Single"}
                              onChange={this.handleChange}
                              value="Single"
                              name="phase"
                              className="form-check-input"
                              type="radio"
                              id="phaseRadio1"
                            />
                            <label className="form-check-label" htmlFor="phaseRadio1">Single</label>
                          </div>
                          <div className="form-check ml-3">
                            <input
                              defaultChecked={design.phase === "Three"}
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
                        <p className="content-h5">Load Details:</p>
                        <hr />
                        {/* {this.showLoads(design)} */}
                        <div id="loadFormLabels" className="row mx-0 mb-1">
                          <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
                            <p className="m-0 pt-1">Name</p>
                          </div>
                          <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
                            <p className="m-0 pt-1 ">Qty</p>
                          </div>
                          <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
                            <p className="m-0 pt-1">Power (W)</p>
                          </div>
                          <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
                            <p className="m-0 pt-1">Day (hr)</p>
                          </div>
                          <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
                            <p className="m-0 pt-1">Night (hr)</p>
                          </div>
                          <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
                            <p className="m-0 pt-1">Days / Week</p>
                          </div>
                          <div className="mx-1 p-0 col flex-grow-1 text-center d-flex justify-content-center align-items-end">
                            <p className="m-0 pt-1">Surge Multiplier</p>
                          </div>
                          <div className="critical-column mx-1 p-0 col flex-grow-0 text-center d-flex justify-content-center align-items-end">
                            <p className="m-0 pt-1">Crit?</p>
                          </div>
                        </div>
                        {this.renderLoads(design.loads)}
                        <p className="text-muted text-center font-italic font-small">
                          Only loads marked "crit" will be included in design calculations
                        </p>
                        <div className="text-center mt-4">
                          <button onClick={this.addLoad} className="btn btn-outline-success">Add Load</button>
                          <button onClick={this.deleteLoad} className="btn btn-outline-danger ml-2">Remove Load</button>
                        </div>
                        <p className="content-h5">Load Summary:</p>
                        <hr />
                        <LoadFormSummary loads={this.state.loads} />
                        <p className="content-h5">Other Information:</p>
                        <hr />
                        <div className="form-group">
                          <label className="">Battery Backup Required?</label>
                          <div className="d-flex">
                            <div className="input-group max-200">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <input
                                    defaultChecked={design.batteryBackup === true}
                                    onChange={this.handleChange}
                                    name="batteryBackup"
                                    type="checkbox"
                                    id="batteryCheckbox"
                                  />
                                </div>
                              </div>
                              <input
                                value={this.state.autoHours === undefined ? design.autoHours : this.state.autoHours}
                                onChange={this.handleChange}
                                name="autoHours"
                                type="number"
                                min="0"
                                step="0.5"
                                className="form-control form-control-sm"
                                id="autoHours"
                                placeholder="Hours of Autonomy"
                                disabled={(this.state.batteryBackup === undefined && !design.batteryBackup) || this.state.batteryBackup === false}
                              />
                            </div>
                            <div className="d-inline-flex ml-1 pt-2">
                              hours
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="" htmlFor="area_roof">Roof Area Available for Solar:</label>
                          <div className="d-flex">
                            <input
                              defaultValue={design.area_roof}
                              onChange={this.handleChange}
                              name="area_roof"
                              type="number"
                              min="0"
                              step="1"
                              className="form-control form-control-sm"
                              id="area_roof"
                              placeholder="Roof"
                            />
                            <div className="d-inline-flex ml-1 pt-2">
                              m<sup>2</sup>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="" htmlFor="area_ground">Ground Area Available for Solar:</label>
                          <div className="d-flex">
                            <input
                              defaultValue={design.area_ground}
                              onChange={this.handleChange}
                              name="area_ground"
                              type="number"
                              min="0"
                              step="1"
                              className="form-control form-control-sm"
                              id="area_ground"
                              placeholder="Ground"
                            />
                            <div className="d-inline-flex ml-1 pt-2">
                              m<sup>2</sup>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="ghanaNotes">Notes:</label>
                          <textarea
                            className="form-control"
                            id="ghanaNotes"
                            rows="3"
                            defaultValue={design.notes}
                            onChange={this.handleChange}
                            name="notes"
                          />
                        </div>
                        <label htmlFor="ghanaNotes">Image Upload:</label>
                        <div className="input-group">
                          <div className="custom-file">
                            <input
                              type="file"
                              id="file"
                              name="file"
                              className="custom-file-input"
                              onChange={this.uploadFile}
                            />
                            <label className="custom-file-label" htmlFor="inputFile">Choose image</label>
                          </div>
                        </div>
                        <div className="d-flex align-items-start flex-wrap my-4">
                          {this.renderImages(design.images)}
                        </div>
                        <ErrorMessage error={error} />
                        <div className="text-center mt-4">
                          <button id="design-form-submit" type="submit" className="btn btn-lg btn-primary">Update Design</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </Mutation>
            )
          }
        }}
      </Query>
    );
  }
}

const DESIGN_QUERY = gql`
  query DESIGN_QUERY ($id: ID) {
    design(id: $id) {
      id
      author {
        id
        username
      }
      deanery
      location
      parish
      longitude
      longitudeDir
      latitude
      latitudeDir
      gridTied
      generator
      voltage
      freq
      phase
      area_roof
      area_ground
      batteryBackup
      autoHours
      loads {
        id
        name
        quantity
        power
        dayUsage
        nightUsage
        usageDays
        surgeMult
        crit
      }
      images
      notes
    }
  }
`

const EDIT_DESIGN_MUTATION = gql`
  mutation EDIT_DESIGN_MUTATION(
    $id: ID!
    $deanery: String, 
    $location: String, 
    $parish: String,
    $longitude: Float,
    $longitudeDir: String,
    $latitude: Float,
    $latitudeDir: String,
    $gridTied: String,
    $generator: String,
    $voltage: String,
    $freq: String,
    $phase: String,
    $area_roof: Int,
    $area_ground: Int,
    $batteryBackup: Boolean,
    $autoHours: Float,
    $loads: [LoadCreateWithoutDesignInput],
    $images: [String],
    $notes: String,
    ) {
  updateDesign(
    id: $id
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
    batteryBackup: $batteryBackup
    autoHours: $autoHours
    loads: $loads
    images: $images
    notes: $notes
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

export default DesignEditGhana;