import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';

import { ISpecialModel } from './stores/SpecialStore';

interface ISpecialProps {
  special?: ISpecialModel;
}

const Special = ({ special }: ISpecialProps): JSX.Element => {
  console.log('Special', getSnapshot(special));

  useEffect(() => {
    special.setSpecial('new SPECIAL');
  }, []);

  return <div>Special</div>;
};

export default inject(({ newCampaignSettings }) => ({
  special: newCampaignSettings.special,
}))(observer(Special));
