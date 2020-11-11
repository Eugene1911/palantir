import React from 'react';
import uuid from 'react-uuid';
import { inject, observer } from 'mobx-react';
import { TFilterSideStore } from 'sharedWidgets/FilterSide/store/FilterSideStore';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Box from '@material-ui/core/Box';
import { KEY_ENTER_CODE } from 'config/constants';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';
import { useTable } from '../../services/useTable';
import { EIDModel } from '../../assets/constants/commonAudienceTypes';
import {
  columns,
  searchPlaceholder,
} from '../../assets/constants/tableConst';
import SearchInput, {
  useSearchInput,
} from '../../components/SearchInput';
import { TAudienceModel, TSpot } from '../../stores/AudienceStore';
import { IRowItem } from '../../components/IDTable';
import BidInput from '../../components/BidInput';
import { buttonsConst } from '../../assets/constants/buttonsConst';
import { tagsConst } from './assets/tableConst';
import { usePrimeTable } from './usePrimeTable';
import useStyles from './useStyles';
import * as S from './styles';

interface IPrimeTableProps {
  audience?: TAudienceModel;
  filterSide?: TFilterSideStore;
}

function PrimeTable(props: IPrimeTableProps): JSX.Element {
  const { audience, filterSide } = props;
  const { sites } = audience[EIDModel.SITE_ID];

  const {
    selectedSpots,
    setSelectedSpots,
    filteredSpots,
    setFilteredSpots,
    filterSpots,
    getFilterTextArray,
    preventDefault,
  } = useTable({ audience });

  const { inputText, onInputChange } = useSearchInput();

  const { updateSelected, updateFiltered } = usePrimeTable({
    audience,
    selectedSpots,
    setFilteredSpots,
    setSelectedSpots,
    getFilterTextArray,
    filterSpots,
  });

  React.useEffect(updateSelected, [updateSelected]);

  React.useEffect(() => updateFiltered(inputText), [updateFiltered]);

  const onKeyPressHandler = (
    event?: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (!event || event.key === KEY_ENTER_CODE) {
      event?.preventDefault();

      if (!inputText) {
        setFilteredSpots(selectedSpots);
      } else {
        const textArray = getFilterTextArray(inputText);

        filterSpots(textArray);
      }
      // setInputText('');
    }
  };

  const onEditClickHandler = () => {
    audience.setFilterSideModel(EIDModel.SPOT_ID);
    filterSide.onToggleFilterHandler();
  };

  const setBid = React.useCallback(
    (value: string, spotID: string): void => {
      audience.setSpotBid(value, spotID);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const deleteRow = React.useCallback(
    (rowId: string): void => {
      const newSelected = selectedSpots
        .filter(({ id }) => id !== rowId)
        .map(({ id }) => id);

      audience.setTagsSelected(newSelected, EIDModel.SPOT_ID);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedSpots],
  );

  const leftColumns = React.useMemo(() => {
    return [
      columns.siteID,
      columns.domain,
      columns.spotID,
      columns.adZone,
    ];
  }, []);

  const rightColumns = React.useMemo(() => {
    return [
      <>
        <S.StyledArrowDownwardIcon />
        {columns.avg}
      </>,
      columns.bid,
      '',
    ];
  }, []);

  const getSpotRow = React.useCallback(
    (
      spot: TSpot,
      isFirstInSection: boolean,
      isLastInSection: boolean,
    ): IRowItem[] => {
      return [
        {
          item: spot.siteID,
          isDisabled: !isFirstInSection,
          isBordered: isLastInSection,
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
          isBordered: isLastInSection,
        },
        {
          item: spot.id,
          isDisabled: false,
          isBordered: isLastInSection,
        },
        {
          item: (
            <S.AdZoneWrap>
              <Typography>{spot.adZone}</Typography>
              {spot.isPrime && (
                <S.Tag>
                  <Typography color="primary">
                    {tagsConst.prime}
                  </Typography>
                </S.Tag>
              )}
              {spot.isMultiformat && (
                <S.Tag>
                  <Typography color="primary">
                    {tagsConst.multiformat}
                  </Typography>
                </S.Tag>
              )}
            </S.AdZoneWrap>
          ),
          isDisabled: false,
          isBordered: isLastInSection,
        },
        {
          item: spot.avg,
          isDisabled: false,
          isBordered: isLastInSection,
        },
        {
          item: (
            <S.BidWrap>
              <BidInput
                initValue={spot.bid}
                setBid={value => setBid(value, spot.id)}
              />
            </S.BidWrap>
          ),
          isDisabled: false,
          isBordered: isLastInSection,
        },
        {
          item: (
            <IconButton
              onClick={() => deleteRow(spot.id)}
              size="small"
            >
              <CloseIcon color="secondary" fontSize="small" />
            </IconButton>
          ),
          isDisabled: false,
          isBordered: isLastInSection,
        },
      ];
    },
    [deleteRow, preventDefault, setBid],
  );

  const rows: IRowItem[][] = React.useMemo(() => {
    let rowsArr = [];

    sites.forEach(({ id }) => {
      const siteSpots = filteredSpots.filter(
        spot => spot.siteID === id,
      );

      rowsArr = rowsArr.concat(
        siteSpots.map((spot, index) => {
          return getSpotRow(
            spot,
            index === 0,
            index === siteSpots.length - 1,
          );
        }),
      );
    });

    return rowsArr;
  }, [filteredSpots, getSpotRow, sites]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles();

  return (
    <>
      <S.HeaderWrap>
        <Grid container justify="space-between">
          <Grid container item xs={8}>
            <Grid item xs={6}>
              <SearchInput
                placeholder={searchPlaceholder[EIDModel.SPOT_ID]}
                onKeyPressHandler={onKeyPressHandler}
                inputText={inputText}
                onInputChange={onInputChange}
              />
            </Grid>
            <Grid item xs={1}>
              <Button color="primary" onClick={onEditClickHandler}>
                <S.EditButtonInner>
                  <EditIcon color="primary" />
                  {buttonsConst.edit}
                </S.EditButtonInner>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <TablePagination
              rowsPerPageOptions={[5, 15, 25]}
              component="div"
              count={filteredSpots.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </S.HeaderWrap>
      <TableContainer>
        <Table stickyHeader className={classes.padding}>
          <TableHead>
            <TableRow>
              <>
                {leftColumns.map(title => {
                  return (
                    <TableCell
                      key={title}
                      align="left"
                      className={classes.headerCell}
                    >
                      {title}
                    </TableCell>
                  );
                })}
                {rightColumns.map(title => {
                  return (
                    <TableCell
                      key={uuid()}
                      align="right"
                      className={classes.headerCell}
                    >
                      {title}
                    </TableCell>
                  );
                })}
              </>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
              )
              .map((row, rowIndex) => {
                return (
                  <TableRow key={uuid()}>
                    {row.map(
                      (
                        { item, isDisabled, isBordered },
                        itemIndex,
                      ) => {
                        return (
                          <TableCell
                            key={uuid()}
                            color={
                              isDisabled && rowIndex > 0
                                ? 'textSecondary'
                                : ''
                            }
                            className={
                              isBordered ? '' : classes.noBorderCell
                            }
                            align={
                              itemIndex >= leftColumns.length
                                ? 'right'
                                : 'left'
                            }
                          >
                            <Box
                              className={
                                isDisabled && rowIndex > 0
                                  ? classes.disabledCell
                                  : ''
                              }
                            >
                              {item}
                            </Box>
                          </TableCell>
                        );
                      },
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default inject(
  ({ CampaignAudienceAndPricingStore, filterSideStore }) => ({
    audience: CampaignAudienceAndPricingStore.audience,
    filterSide: filterSideStore,
  }),
)(observer(PrimeTable));
