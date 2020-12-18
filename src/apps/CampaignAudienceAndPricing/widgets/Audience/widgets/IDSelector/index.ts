import { inject, observer } from 'mobx-react';
import { TFilterSideStore } from 'sharedWidgets/FilterSide/store/FilterSideStore';
import IDSelector from '../../components/IDSelector';
import { TAudienceModel } from '../../stores/AudienceStore';
import {
  EIDModel,
  ETagStatus,
} from '../../assets/constants/commonAudienceTypes';
import { disabledTagToolTip } from '../../assets/constants/rightSidesConst';

interface IDSelectorControllerProps {
  model: EIDModel;
  audience?: TAudienceModel;
  filterSide?: TFilterSideStore;
}

function IDSelectorController(
  props?: IDSelectorControllerProps,
): JSX.Element {
  const { model, audience, filterSide } = props;

  const onInputEnter = (tags: string[]) => {
    if (model === EIDModel.SUB_ID) {
      audience.setTagsSelected(
        tags.map(tag => ({
          id: tag,
          status: ETagStatus.ACTIVE,
          tooltip: '',
        })),
        model,
      );
    } else {
      audience.setTagsSelected(tags, model);
    }
  };

  const IDSelectorParams = {
    onInputEnter,
    onRadioChange: listType => audience.setListType(listType, model),
    closeTag: tagID => audience.closeTag(tagID, model),
    clearTags: () => audience.clearTags(model),
    getTagById: tagID => audience.getTagById(tagID, model),
    onFilterSideOpen: () => {
      audience.setFilterSideModel(model);
      filterSide.onToggleFilterHandler();
    },
    radioSelected: audience[model].listType,
    tags: audience[model].tags,
    tagsSelected: audience[model].tagsSelected,
    placeholder: model,
    isNewTagAllowed: model === EIDModel.SUB_ID,
    disabledTagToolTip: disabledTagToolTip(
      model === EIDModel.SPOT_ID,
    ),
    addSpotsButton: model === EIDModel.SPOT_ID,
  };

  return IDSelector(IDSelectorParams);
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  audience: CampaignAudienceAndPricingStore.audience,
  filterSide:
    CampaignAudienceAndPricingStore.audience.filterSideStore,
}))(observer(IDSelectorController));
