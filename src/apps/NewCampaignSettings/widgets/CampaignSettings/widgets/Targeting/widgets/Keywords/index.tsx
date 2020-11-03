import React from 'react';
import { inject, observer } from 'mobx-react';

import TagsListWithEnter from '../../components/TagsListWithEnter';
import { TKeywordsModel } from '../../stores/models/Keywords';

interface IKeywordsProps {
  keywords?: TKeywordsModel;
}

const Keywords = ({ keywords }: IKeywordsProps): JSX.Element => {
  return (
    <TagsListWithEnter
      list={keywords.list}
      onEnter={keywords.setTags}
      onDelete={keywords.deleteTag}
      onClearAll={keywords.clearAll}
      isError={false}
      label="Keywords"
      tagsCount={keywords.tagsCount}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  keywords: newCampaignSettings.targeting.keywords,
}))(observer(Keywords));
