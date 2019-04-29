import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';

const DesignSolarAnnual = () => {
  return (
    <DesignContextConsumer>
      {(value) => {
        return (
          <div>
            Annual Solar..
          </div>
        )
      }}
    </DesignContextConsumer>
  );
};

export default DesignSolarAnnual;