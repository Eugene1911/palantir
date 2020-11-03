import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TFilterSideStore } from 'sharedWidgets/FilterSide/store/FilterSideStore';
import FilterSide from 'sharedWidgets/FilterSide';
import { Grid } from '@material-ui/core';
import { KEY_ENTER_CODE } from 'config/constants';
import IDTable, { IRowItem } from '../../components/IDTable';
import AddSpotsButton from '../AddSpotsButton';
import SideTableFooter from '../../components/SideTableFooter';
import SearchInput, {
  useSearchInput,
} from '../../components/SearchInput';
import {
  TSite,
  TAudienceModel,
  TSpot,
} from '../../stores/AudienceStore';
import { EIDModel } from '../../assets/constants/commonAudienceTypes';
import { EFetchStatus } from '../../../../assets/commonTypes';
import {
  titles,
  columns,
  searchPlaceholder,
} from '../../assets/constants/tableConst';
import { StyledArrowDownwardIcon } from './styles';

interface IDTableControllerProps {
  audience?: TAudienceModel;
  filterSide?: TFilterSideStore;
}

function IDTableController(
  props?: IDTableControllerProps,
): JSX.Element {
  const { audience, filterSide } = props;
  const model = audience.filterSideModel;

  const siteFetchStatus = audience[EIDModel.SITE_ID].fetchStatus;
  const spotFetchStatus = audience[EIDModel.SPOT_ID].fetchStatus;
  const isFetchSuccess = React.useMemo(
    () =>
      siteFetchStatus === EFetchStatus.SUCCESS &&
      spotFetchStatus === EFetchStatus.SUCCESS,
    [siteFetchStatus, spotFetchStatus],
  );

  const { inputText, setInputText, onInputChange } = useSearchInput();

  const [selectedSites, setSelectedSites] = useState<TSite[]>(
    audience.selectedSites,
  );
  const [selectedSpots, setSelectedSpots] = useState<TSpot[]>(
    audience.selectedSpots,
  );

  React.useEffect(() => {
    if (isFetchSuccess) {
      setSelectedSites(audience.selectedSites);
      setSelectedSpots(audience.selectedSpots);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchSuccess]);

  const filterSites = (textArray: string[]): TSite[] => {
    return audience.selectedSites.filter(
      site =>
        textArray.includes(String(site.id)) ||
        textArray.includes(String(site.domain)),
    );
  };

  const filterSpots = (textArray: string[]): TSpot[] => {
    return audience.selectedSpots.filter(
      spot =>
        textArray.includes(String(spot.id)) ||
        textArray.includes(String(spot.domain)) ||
        textArray.includes(String(spot.siteID)),
    );
  };

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    const { key } = event;

    if (key === KEY_ENTER_CODE) {
      event.preventDefault();

      if (!inputText) {
        setSelectedSites(audience.selectedSites);
        setSelectedSpots(audience.selectedSpots);
      } else {
        let textArray = !!inputText && inputText.split(',');
        textArray = textArray.map(word => word.trim());

        if (model === EIDModel.SITE_ID) {
          setSelectedSites(filterSites(textArray));
        } else {
          setSelectedSpots(filterSpots(textArray));
        }
      }

      setInputText('');
    }
  };

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  const getLeftColumns = React.useCallback(() => {
    if (model === EIDModel.SITE_ID) {
      return [columns.siteID, columns.domain];
    }
    return [
      columns.siteID,
      columns.domain,
      columns.spotID,
      columns.adZone,
    ];
  }, [model]);

  const getRightColumns = React.useCallback(() => {
    return [
      <>
        <StyledArrowDownwardIcon />
        {columns.avg}
      </>,
      '',
    ];
  }, []);

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
      return selectedSites.map(site => {
        return [getSiteRow(site)];
      });
    }

    return selectedSites.map(({ id }) => {
      return selectedSpots
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

  const sideTableFooterParams = React.useMemo(
    () => ({
      chosenAmount: audience[model].tagsSelected.length,
      onClear: () => audience.clearTags(model),
      onDone: filterSide.onToggleFilterHandler,
      onCancel: filterSide.onToggleFilterHandler,
    }),
    [audience, filterSide.onToggleFilterHandler, model],
  );

  if (model !== EIDModel.SUB_ID && !isFetchSuccess) {
    return <></>;
  }

  return (
    <FilterSide
      title={titles[model]}
      width={900}
      filterSideStore={filterSide}
    >
      <>
        <Grid container justify="space-between">
          <Grid item xs={6}>
            <SearchInput
              placeholder={searchPlaceholder[model]}
              onKeyPressHandler={onKeyPressHandler}
              inputText={inputText}
              onInputChange={onInputChange}
            />
          </Grid>
          {model === EIDModel.SPOT_ID && (
            <Grid container item justify="flex-end" xs={3}>
              <Grid item>
                <AddSpotsButton />
              </Grid>
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
