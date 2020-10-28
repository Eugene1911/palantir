import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import SearchTable from 'sharedWidgets/SearchTable';
import TablePaginationMain from 'sharedComponents/TablePaginationMain';
import useStores from 'apps/Optimizers/store';
import OptimizersTable from '../OptimizersTable';

function OptimizersTableWrapper(): JSX.Element {
  const { t } = useTranslation('optimizers');
  const { optimizersListStore } = useStores();
  const {
    optimizers,
    isLoading,
    count,
    requestParams,
    loadOptimizers,
    onChangeSearchHandler,
    onChangePaginationHandler,
  } = optimizersListStore;

  useEffect(() => {
    loadOptimizers();
  }, []);

  return (
    <>
      <CardContent>
        <Grid
          justify="space-between"
          alignItems="flex-start"
          container
        >
          <Grid item xs={12} sm={12} md={5}>
            <div style={{ paddingTop: '3px' }}>
              <SearchTable
                onChange={onChangeSearchHandler}
                placeholder={t(
                  'optimizers:list:search_by_optimizer_name_or_rule',
                )}
              />
            </div>
          </Grid>
          <Grid xs item>
            <TablePaginationMain
              page={requestParams.page}
              count={count}
              pageSize={requestParams.size}
              isFetching={isLoading}
              onChange={onChangePaginationHandler}
            />
          </Grid>
        </Grid>
      </CardContent>
      <br />
      <OptimizersTable isLoading={isLoading} data={optimizers} />
    </>
  );
}

export default observer(OptimizersTableWrapper);
