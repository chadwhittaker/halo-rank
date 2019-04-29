import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';

const DesignLoad = () => {
  return (
    <DesignContextConsumer>
      {(value) => {
        return (
          <div>
            Design Load Stuff...
          </div>
        )
      }}
    </DesignContextConsumer>
  );
};

export default DesignLoad;