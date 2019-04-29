import React from 'react';

import DesignShow from '../components/DesignShow';
import { DesignContextProvider } from '../utils/DesignContext';

const DesignShowPage = (props) => {
  return (
    <div>
      <DesignContextProvider>
        <DesignShow id={props.match.params.id} />
      </DesignContextProvider>
    </div>
  );
};

export default DesignShowPage;