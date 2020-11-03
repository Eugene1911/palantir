import React from 'react';
import Radio3Group from '../Radio3Group';
import { flashRadios } from '../../constants/radioValues';

const Flash = (): JSX.Element => {
  return <Radio3Group field="flash" radios={flashRadios} />;
};

export default Flash;
