import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';

const DesignDesign = () => {
  return (
    <DesignContextConsumer>
      {(value) => {
        return (
          <div>
            Design Stuff..
          </div>
        )
      }}
    </DesignContextConsumer>
  );
};

export default DesignDesign;