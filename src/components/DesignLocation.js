import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';

const DesignLocation = () => {
  return (
    <DesignContextConsumer>
      {(value) => {
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