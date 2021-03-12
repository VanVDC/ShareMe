import React, { Fragment } from 'react';
import Spinn from './spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={Spinn}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </Fragment>
  );
};

export default Spinner;
