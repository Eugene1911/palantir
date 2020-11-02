import React from 'react';
import { inject, observer } from 'mobx-react';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TFilterSideStore } from 'sharedWidgets/FilterSide/store/FilterSideStore';
import FilterSide from 'sharedWidgets/FilterSide';
import { Grid } from '@material-ui/core';
import IDTable, { IRowItem } from '../../components/IDTable';
import AddSpotsButton from '../AddSpotsButton';
import {
  TSite,
  TAudienceModel,
  TSpot,
} from '../../stores/AudienceStore';
import { EIDModel } from '../../assets/constants/commonAudienceTypes';
import { titles, columns } from '../../assets/constants/tableConst';
import { EFetchStatus } from '../../../../assets/commonTypes';
import { StyledArrowDownwardIcon } from './styles';
import SideTableFooter from '../../components/SideTableFooter';

interface IDTableControllerProps {
  audience?: TAudienceModel;
  filterSide?: TFilterSideStore;
}

function IDTableController(
  props?: IDTableControllerProps,
): JSX.Element {
  const { audience, filterSide } = props;
  const model = audience.filterSideModel;
  if (
    model !== EIDModel.SUB_ID &&
    audience[model].fetchStatus !== EFetchStatus.SUCCESS
  ) {
    return <></>;
  }

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

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

  const getRightColumns = () => {
    return [
      <>
        <StyledArrowDownwardIcon />
        {columns.avg}
      </>,
      '',
    ];
  };

  const getSiteRow = (site: TSite): IRowItem[] => {
    return [
      {
        item: site.id,
        isDisabled: false,
      },
      {
        item: (
          <Link onClick={preventDefault} href={site.domain}>
            {site.domain}
          </Link>
        ),
        isDisabled: false,
      },
      {
        item: site.avg,
        isDisabled: false,
      },
      {
        item: (
          <IconButton
            onClick={() =>
              audience.closeTag(site.id, EIDModel.SITE_ID)
            }
            size="small"
          >
            <CloseIcon color="secondary" fontSize="small" />
          </IconButton>
        ),
        isDisabled: false,
      },
    ];
  };

  const getSpotRow = (
    spot: TSpot,
    isFirstInSection: boolean,
  ): IRowItem[] => {
    return [
      {
        item: spot.siteID,
        isDisabled: !isFirstInSection,
      },
      {
        item: isFirstInSection ? (
          <Link onClick={preventDefault} href={spot.domain}>
            {spot.domain}
          </Link>
        ) : (
          spot.domain
        ),
        isDisabled: !isFirstInSection,
      },
      {
        item: spot.id,
        isDisabled: false,
      },
      {
        item: spot.adZone,
        isDisabled: false,
      },
      {
        item: spot.avg,
        isDisabled: false,
      },
      {
        item: (
          <IconButton
            onClick={() =>
              audience.closeTag(spot.id, EIDModel.SPOT_ID)
            }
            size="small"
          >
            <CloseIcon color="secondary" fontSize="small" />
          </IconButton>
        ),
        isDisabled: false,
      },
    ];
  };

  const getRowsSections = (): IRowItem[][][] => {
    if (model === EIDModel.SITE_ID) {
      return audience.selectedSites.map(site => {
        return [getSiteRow(site)];
      });
    }

    return audience.selectedSites.map(({ id }) => {
      return audience.selectedSpots
        .filter(spot => spot.siteID === id)
        .map((spot, index) => {
          return getSpotRow(spot, index === 0);
        });
    });
  };

  const IDTableParams = {
    leftColumns: getLeftColumns(),
    rightColumns: getRightColumns(),
    rowsSections: getRowsSections(),
  };
  const sideTableFooterParams = {
    chosenAmount: audience[model].tagsSelected.length,
    onClear: () => audience.clearTags(model),
    onDone: filterSide.onToggleFilterHandler,
    onCancel: filterSide.onToggleFilterHandler,
  };

  return (
    <FilterSide title={titles[model]} width={900}>
      <>
        <Grid container justify="space-between">
          <Grid item xs={6} />
          {model === EIDModel.SPOT_ID && (
            <Grid item alignContent="flex-end" xs={3}>
              <AddSpotsButton />
            </Grid>
          )}
        </Grid>
        <IDTable {...IDTableParams} />
        <SideTableFooter {...sideTableFooterParams} />
      </>
    </FilterSide>
  );
}

export default inject(
  ({ CampaignAudienceAndPricingStore, filterSideStore }) => ({
    audience: CampaignAudienceAndPricingStore.audience,
    filterSide: filterSideStore,
  }),
)(observer(IDTableController));
