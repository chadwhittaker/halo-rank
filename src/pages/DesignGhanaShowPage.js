import React from 'react';

import DesignShowGhana from '../components/DesignShowGhana';

const DesignShowGhanaPage = (props) => {
  return (
    <div>
      <DesignShowGhana id={props.match.params.id} />
    </div>
  );
};

export default DesignShowGhanaPage;