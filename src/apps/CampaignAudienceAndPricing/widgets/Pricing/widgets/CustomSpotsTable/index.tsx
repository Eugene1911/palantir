import React from 'react';
import { inject, observer } from 'mobx-react';
import { TFilterSideStore } from 'sharedWidgets/FilterSide/store/FilterSideStore';
import FilterSide from 'sharedWidgets/FilterSide';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { KEY_ENTER_CODE } from 'config/constants';
import {
  TAudienceModel,
  TSpot,
} from '../../../Audience/stores/AudienceStore';
import { title } from '../../assets/constants/tableConst';
import SideTableFooter from '../../../Audience/components/SideTableFooter';
import SearchInput, {
  useSearchInput,
} from '../../../Audience/components/SearchInput';
import {
  columns,
  searchPlaceholder,
} from '../../../Audience/assets/constants/tableConst';
import { EIDModel } from '../../../Audience/assets/constants/commonAudienceTypes';
import { buttonsConst } from '../../../Audience/assets/constants/buttonsConst';
import IDTable, {
  IRowItem,
} from '../../../Audience/components/IDTable';
import { useTable } from '../../../Audience/services/useTable';
import BidInput from '../../../Audience/components/BidInput';
import MassUpdateButton from '../../components/MassUpdate';
import * as S from './styles';

interface ICustomSpotsTableProps {
  audience?: TAudienceModel;
  filterSide?: TFilterSideStore;
}

function CustomSpotsTable(
  props?: ICustomSpotsTableProps,
): JSX.Element {
  const { audience, filterSide } = props;
  const { inputText, setInputText, onInputChange } = useSearchInput();

  const {
    baseSpots,
    selectedSpots,
    setSelectedSpots,
    filteredSpots,
    setFilteredSpots,
    deselectAll,
    selectAll,
    selectSpot,
    isSelected,
    // setBid,
    filterSpots,
    getFilterTextArray,
    preventDefault,
  } = useTable({
    audience,
    isCustomSpot: true,
  });

  const [localBids, setLocalBids] = React.useState<{
    [id: string]: string;
  }>({});

  const setBid = (bid: string, id: string): void => {
    setLocalBids(prev => ({ ...prev, [id]: bid }));
  };

  const massUpdateBids = (bid: string): void => {
    const newBids = {};

    selectedSpots.forEach(({ id }) => {
      newBids[id] = bid;
    });
    setLocalBids(prev => ({ ...prev, ...newBids }));
  };

  const saveLocalBids = () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [id, bid] of Object.entries(localBids)) {
      audience.setSpotBid(bid, id);
    }
  };

  const deselectSpot = (spotId: string): void => {
    setSelectedSpots(selectedSpots.filter(({ id }) => id !== spotId));
  };

  const cancelLocalState = () => {
    setLocalBids({});
    setInputText('');
    setSelectedSpots(audience.selectedSpots);
    setFilteredSpots(baseSpots);
  };

  const saveLocalState = () => {
    saveLocalBids();
  };

  const onKeyPressHandler = (
    event?: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (!event || event.key === KEY_ENTER_CODE) {
      event?.preventDefault();

      if (!inputText) {
        setFilteredSpots(baseSpots);
      } else {
        const textArray = getFilterTextArray(inputText);
        filterSpots(textArray);
      }
    }
  };

  const getLeftColumns = React.useCallback(() => {
    const isChecked = selectedSpots.length === baseSpots.length;
    const leftColumns = [
      <Checkbox
        key="checkbox"
        color="primary"
        checked={selectedSpots.length === baseSpots.length}
        onChange={isChecked ? deselectAll : selectAll}
      />,
      columns.siteID,
      columns.domain,
      columns.spotID,
      columns.adZone,
    ];

    return leftColumns;
  }, [
    baseSpots.length,
    deselectAll,
    selectAll,
    selectedSpots.length,
  ]);

  const getRightColumns = React.useCallback(() => {
    return [
      <>
        <S.StyledArrowDownwardIcon />
        {columns.avg}
      </>,
      columns.bid,
    ];
  }, []);

  const getSpotRow = (
    spot: TSpot,
    isFirstInSection: boolean,
  ): IRowItem[] => {
    const isSpotSelected = isSelected(spot);
    const row = [
      {
        item: (
          <Checkbox
            color="primary"
            checked={isSpotSelected}
            onChange={
              isSpotSelected
                ? () => deselectSpot(spot.id)
                : () => selectSpot(spot)
            }
          />
        ),
        isDisabled: false,
      },
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
          <S.BidWrap>
            <BidInput
              initValue={localBids[spot.id] || spot.bid}
              setBid={value => setBid(value, spot.id)}
            />
          </S.BidWrap>
        ),
        isDisabled: false,
      },
    ];

    return row;
  };

  const getRowsSections = (): IRowItem[][][] => {
    return audience[EIDModel.SITE_ID].sites.map(({ id }) => {
      return filteredSpots
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
    chosenAmount: selectedSpots.length,
    onDone: () => {
      saveLocalState();
      filterSide.onToggleFilterHandler();
    },
    onCancel: () => {
      filterSide.onToggleFilterHandler();
      cancelLocalState();
    },
    massUpdate: <MassUpdateButton onApply={massUpdateBids} />,
  };

  return (
    <FilterSide
      title={title}
      width={900}
      filterSideStore={filterSide}
      onClose={cancelLocalState}
    >
      <>
        <S.HeaderWrap>
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <SearchInput
                placeholder={searchPlaceholder[EIDModel.SPOT_ID]}
                onKeyPressHandler={onKeyPressHandler}
                inputText={inputText}
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid container item justify="flex-end" xs={3}>
              <Grid item>
                <Button color="primary" onClick={deselectAll}>
                  {buttonsConst.deselect}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </S.HeaderWrap>
        <IDTable {...IDTableParams} />
        <SideTableFooter {...sideTableFooterParams} />
      </>
    </FilterSide>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  audience: CampaignAudienceAndPricingStore.audience,
  filterSide: CampaignAudienceAndPricingStore.pricing.filterSideStore,
}))(observer(CustomSpotsTable));
