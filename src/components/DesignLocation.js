import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';

const DesignLocation = () => {
  return (
    <DesignContextConsumer>
      {(value) => {
        if(!value.designData) return <div>Loading...</div>
        return (
          <div>
            Design Location Stuff..
            {value.designData.inverter.name}
          </div>
        )
      }}
    </DesignContextConsumer>
  );
};

export default DesignLocation;