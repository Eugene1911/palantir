import { inject, observer } from 'mobx-react';
import { TFilterSideStore } from 'sharedWidgets/FilterSide/store/FilterSideStore';
import IDSelector from '../../components/IDSelector';
import { TAudienceModel } from '../../stores/AudienceStore';
import { EIDModel } from '../../assets/constants/commonAudienceTypes';

interface IDSelectorControllerProps {
  model: EIDModel;
  audience?: TAudienceModel;
  filterSide?: TFilterSideStore;
}

function IDSelectorController(
  props?: IDSelectorControllerProps,
): JSX.Element {
  const { model, audience, filterSide } = props;

  const IDSelectorParams = {
    onInputEnter: tags => audience.setTagsSelected(tags, model),
    onRadioChange: listType => audience.setListType(listType, model),
    closeTag: tagID => audience.closeTag(tagID, model),
    clearTags: () => audience.clearTags(model),
    onEditClick: () => {
      audience.setFilterSideModel(model);
      filterSide.onToggleFilterHandler();
    },
    radioSelected: audience[model].listType,
    tags: audience[model].tags,
    tagsSelected: audience[model].tagsSelected,
    placeholder: model,
  };

  return IDSelector(IDSelectorParams);
}

export default inject(
  ({ CampaignAudienceAndPricingStore, filterSideStore }) => ({
    audience: CampaignAudienceAndPricingStore.audience,
    filterSide: filterSideStore,
  }),
)(observer(IDSelectorController));
