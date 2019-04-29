import React, { Component } from 'react';

import selectInverterAndBattery from '../utils/selectInverterAndBattery';

const DesignContext = React.createContext();

class DesignContextProvider extends Component {
  state = {
    firstCalc: true,
    designData: null,
  };

  generateDesignData = (queryData) => {

    // run first calc here
    if (this.state.firstCalc) {
      console.log("doing first calc")

      // DO MATH HERE
      const designData = selectInverterAndBattery(queryData);

      // PUT FINAL CALCULATIONS IN STATE
      this.setState((prevState, props) => ({ 
        designData,
        firstCalc: false,
       }));
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