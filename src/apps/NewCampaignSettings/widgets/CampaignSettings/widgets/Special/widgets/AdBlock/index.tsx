import React from 'react';
import Radio3Group from '../Radio3Group';
import { addBlockRadios } from '../../constants/radioValues';

const AdBlock = (): JSX.Element => {
  return <Radio3Group field="adBlock" radios={addBlockRadios} />;
};

export default AdBlock;
