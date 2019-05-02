import React, { Component } from 'react';
import axios from 'axios';

import selectParts from '../utils/selectParts';
import finishCalc from '../utils/finishCalc';
import { wtokwDown, round } from '../utils'

const DesignContext = React.createContext();

class DesignContextProvider extends Component {
  state = {
    firstCalc: true,
    designData: null,
  };

  generateDesignData = async (queryData) => {

    // run first calc here
    if (this.state.firstCalc) {
      console.log("doing first calc")

      // 1. SELECT PARTS
      const designData = selectParts(queryData);

      // 2. SEND NREL API
      const getNREL = async () => {
        const url_hourly = "https://developer.nrel.gov/api/pvwatts/v6.json?api_key=o8yYB1H1FQIICBvvsgSB8zQFt8guguKSGba8sWdj" +
          "&system_capacity=" + wtokwDown(designData.ratedSolarP) +
          "&module_type=0" +
          "&losses=" + (100 - round(designData.inputs.param_solarEff, 2) * 100) +
          "&array_type=0" +
          "&tilt=5.6" +
          "&azimuth=180" +
          "&lat=5.6" +
          "&lon=-0.2" +
          "&dataset=intl" +
          "&timeframe=hourly";
        try {
          const response = await axios.get(url_hourly);
          return response
        } catch (error) {
          return error.response
        }
      }

      const nrel = await getNREL();
      if (nrel.request.status === 200) {

        // 3. FINISH SOLAR CALCULATIONS
        const moreDesignData = finishCalc(nrel, designData)

        // 4. PUT FINAL CALCULATIONS IN STATE
        this.setState((prevState, props) => ({
          designData: { ...designData, ...moreDesignData },
          firstCalc: false,
        }));

      } else {
        // revisit this error handling later...doesn't seem right
        console.log("An error occured!!")
        console.log(nrel);
      }
    }
  }
  updateLoadParams = async (loads) => {

    // spread in the previous inputs object and replace the loads with new loads
    const newInputs = {...this.state.designData.inputs, loads}
    console.log(newInputs)
    console.log("updating loads")

    // 1. SELECT PARTS
    const designData = selectParts(newInputs);

    // 2. SEND NREL API
    const getNREL = async () => {
      const url_hourly = "https://developer.nrel.gov/api/pvwatts/v6.json?api_key=o8yYB1H1FQIICBvvsgSB8zQFt8guguKSGba8sWdj" +
        "&system_capacity=" + wtokwDown(designData.ratedSolarP) +
        "&module_type=0" +
        "&losses=" + (100 - round(designData.inputs.param_solarEff, 2) * 100) +
        "&array_type=0" +
        "&tilt=5.6" +
        "&azimuth=180" +
        "&lat=5.6" +
        "&lon=-0.2" +
        "&dataset=intl" +
        "&timeframe=hourly";
      try {
        const response = await axios.get(url_hourly);
        return response
      } catch (error) {
        return error.response
      }
    }

    const nrel = await getNREL();
    if (nrel.request.status === 200) {

      // 3. FINISH SOLAR CALCULATIONS
      const moreDesignData = finishCalc(nrel, designData)

      // 4. PUT FINAL CALCULATIONS IN STATE
      this.setState((prevState, props) => ({
        designData: { ...designData, ...moreDesignData },
        firstCalc: false,
      }));

    } else {
      // revisit this error handling later...doesn't seem right
      console.log("An error occured!!")
      console.log(nrel);
    }

  }

  render() {
    return (
      <DesignContext.Provider
        value={{
          generateDesignData: this.generateDesignData,
          updateDesignParams: this.updateDesignParams,
          updateLoadParams: this.updateLoadParams,
          designData: this.state.designData,
          firstCalc: this.state.firstCalc,
        }}>
        {this.props.children}
      </DesignContext.Provider>
    );
  }
}
const DesignContextConsumer = DesignContext.Consumer;

export { DesignContextProvider };
export { DesignContextConsumer };