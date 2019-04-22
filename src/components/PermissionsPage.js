import React from 'react';

import PleaseSignin from './PleaseSignin';
import Permissions from './Permissions';

const PermissionsPage = () => {
  return (
    <div>
      <PleaseSignin>
        <Permissions />
      </PleaseSignin>
    </div>
  );
};

export default PermissionsPage;