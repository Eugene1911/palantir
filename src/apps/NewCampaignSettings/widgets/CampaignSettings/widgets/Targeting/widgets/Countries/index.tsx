import React from 'react';
import { inject, observer } from 'mobx-react';

// import { AllCustomStatus } from 'sharedTypes';
import { TCountriesModel } from '../../stores/models/Countries';
import AllCustomRadio from '../../../../components/AllCustomRadio';

interface ICountriesProps {
  countries?: TCountriesModel;
}

const Countries = ({ countries }: ICountriesProps): JSX.Element => {
  return (
    <>
      <AllCustomRadio
        onChange={countries.setCountriesRadio}
        value={countries.countriesRadio}
        name="countries"
      />
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  countries: newCampaignSettings.targeting.countries,
}))(observer(Countries));
