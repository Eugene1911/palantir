import { inject, observer } from 'mobx-react';
import IDSelector from '../../components/IDSelector';
import { TAudienceModel } from '../../stores/AudienceStore';

interface IDSelectorControllerProps {
  model: string;
  audience?: TAudienceModel;
}

function IDSelectorController(
  props?: IDSelectorControllerProps,
): JSX.Element {
  const { model, audience } = props;
  const IDSelectorParams = {
    onInputEnter: tags => audience.setTagsSelected(tags, model),
    onRadioChange: listType => audience.setListType(listType, model),
    closeTag: tagID => audience.closeTag(tagID, model),
    clearTags: () => audience.clearTags(model),
    radioSelected: audience[model].listType,
    tags: audience[model].tags,
    tagsSelected: audience[model].tagsSelected,
    placeholder: model,
  };

  return IDSelector(IDSelectorParams);
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  audience: CampaignAudienceAndPricingStore.audience,
}))(observer(IDSelectorController));
