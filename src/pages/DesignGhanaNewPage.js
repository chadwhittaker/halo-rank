import React from 'react';

import PleaseSignin from '../components/PleaseSignin';
// import DesignNewGhana from '../components/DesignNewGhana';
import CreateDesign from '../components/CreateDesign';

const NewDesignGhanaPage = () => {
  return (
    <div>
      <PleaseSignin>
        <CreateDesign />
      </PleaseSignin>
    </div>
  );
};

export default NewDesignGhanaPage;