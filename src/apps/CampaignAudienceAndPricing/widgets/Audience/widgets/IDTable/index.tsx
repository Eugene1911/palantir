import { inject, observer } from 'mobx-react';
import React from 'react';
import IDTable, { IRawItem } from '../../components/IDTable';
import { TAudienceModel } from '../../stores/AudienceStore';
import { EIDModel } from '../../assets/constants/commonAudienceTypes';
import { titles, columns } from '../../assets/constants/tableConst';
import { TFilterSideStore } from '../../../../../../sharedWidgets/FilterSide/store/FilterSideStore';
import FilterSide from '../../../../../../sharedWidgets/FilterSide';

interface IDTableControllerProps {
  audience?: TAudienceModel;
  filterSide?: TFilterSideStore;
}

function IDTableController(
  props?: IDTableControllerProps,
): JSX.Element {
  const { audience } = props;
  const model = audience.filterSideModel;

  const getLeftColumns = () => {
    if (model === EIDModel.SITE_ID) {
      return [columns.siteID, columns.domain];
    }
    return [
      columns.siteID,
      columns.domain,
      columns.spotID,
      columns.adZone,
    ];
  };

  const getRawsSection = (): IRawItem[][] => {
    return audience[EIDModel.SPOT_ID].tagsSelected.map(
      (el, index) => {
        return [
          {
            item: el.id,
            isDisabled: !!index,
          },
        ];
      },
    );
  };

  const IDTableParams = {
    leftColumns: getLeftColumns(),
    rightColumns: [columns.avg],
    withCloseButton: true,
    rawsSections: [getRawsSection(), getRawsSection()],
  };

  return (
    <FilterSide title={titles[model]} width={900}>
      <IDTable {...IDTableParams} />
    </FilterSide>
  );
}

export default inject(
  ({ CampaignAudienceAndPricingStore, filterSideStore }) => ({
    audience: CampaignAudienceAndPricingStore.audience,
    filterSide: filterSideStore,
  }),
)(observer(IDTableController));
