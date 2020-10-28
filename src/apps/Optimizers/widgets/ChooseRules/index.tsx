import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import FilterSide from 'sharedWidgets/FilterSide';
import CardContent from '@material-ui/core/CardContent';
import SearchTable from 'sharedWidgets/SearchTable';
import List from '@material-ui/core/List';
import { v4 as uuidv4 } from 'uuid';
import useStyles from './useStyles';
import useStores, { TOptimizersStors } from '../../store';
import ListItemRules from './components/ListItemRules';
import { TOptimizerModel } from '../OptimizerCreate/store/OptimizerModel';
import ListRulesFooter from './components/ListRulesFooter';

const WIDTH_FILTER_SIDE = 448;

function ChooseRules(): JSX.Element {
  const { t } = useTranslation('optimizers');
  const {
    optimizerCreateStore: { chooseRules },
  }: TOptimizersStors = useStores();
  const {
    // selectRules,
    optimizers,
    filterSide,
    onChangeSearchHandler,
  } = chooseRules;
  const classes = useStyles({});

  return (
    <FilterSide
      title={t('optimizers:select:choose_existing_rules')}
      width={WIDTH_FILTER_SIDE}
      filterSideStore={filterSide}
    >
      <>
        <CardContent>
          <Grid
            justify="space-between"
            alignItems="flex-end"
            container
            spacing={2}
          >
            <Grid xs item>
              <SearchTable
                onChange={onChangeSearchHandler}
                placeholder={t(
                  'optimizers:select:search_by_name_or_rule',
                )}
              />
            </Grid>
            <Grid item>
              <Button
                className={classes.uncheckAllButton}
                color="primary"
              >
                {t('optimizers:select:uncheck_all')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        <List className={classes.list} component="nav">
          {optimizers.map((optimizer: TOptimizerModel) => (
            <ListItemRules key={uuidv4()} optimizer={optimizer} />
          ))}
        </List>

        <ListRulesFooter />
      </>
    </FilterSide>
  );
}

export default observer(ChooseRules);
