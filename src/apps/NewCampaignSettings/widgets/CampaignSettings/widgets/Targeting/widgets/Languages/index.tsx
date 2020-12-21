import React from 'react';
import { inject, observer } from 'mobx-react';

import { AllCustomStatus } from 'sharedTypes';
import { getLanguages } from 'resources/api';
import { TLanguagesModel } from '../../stores/models/Languages';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import ChipsWithFilter from '../../../../components/ChipsWithFilter';

interface ILanguagesProps {
  languages?: TLanguagesModel;
}

const Languages = ({ languages }: ILanguagesProps): JSX.Element => {
  return (
    <>
      <AllCustomRadio
        onChange={languages.setRadio}
        value={languages.radio}
        name="languages"
        counter={languages.selectedCount}
      />

      {languages.radio === AllCustomStatus.CUSTOM && (
        <ChipsWithFilter
          list={languages.list}
          onSelect={languages.setSelected}
          filterTitle="Choose languages"
          loadingStatus={languages.listStatus}
          getList={(notification): Promise<void> =>
            languages.getList(notification, getLanguages)
          }
          selectedCount={languages.selectedCount}
          onSave={languages.saveSelected}
          onCancel={languages.cancelSelected}
          onDelete={languages.deleteSelected}
          selectAllTags={languages.selectAllTags}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  languages: newCampaignSettings.targeting.languages,
}))(observer(Languages));
