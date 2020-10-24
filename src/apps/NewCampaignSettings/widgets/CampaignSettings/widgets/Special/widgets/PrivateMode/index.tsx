import React from 'react';
import Radio3Group from '../Radio3Group';
import { privateModeRadios } from '../../constants/radioValues';

const PrivateMode = (): JSX.Element => {
  return (
    <Radio3Group field="privateMode" radios={privateModeRadios} />
  );
};

export default PrivateMode;
