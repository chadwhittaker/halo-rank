import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';

const DesignCost = () => {
  return (
    <DesignContextConsumer>
      {(value) => {
        return (
          <div>
            Cost...
          </div>
        )
      }}
    </DesignContextConsumer>
  );
};

export default DesignCost;