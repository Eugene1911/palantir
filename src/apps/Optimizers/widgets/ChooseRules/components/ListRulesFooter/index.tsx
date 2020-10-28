import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import useStores, { TOptimizersStors } from 'apps/Optimizers/store';

function ListRulesFooter(): JSX.Element {
  const { t } = useTranslation('optimizers');
  const { optimizerCreateStore }: TOptimizersStors = useStores();
  const {
    selectRules,
    onApplayChooseRules,
  } = optimizerCreateStore.chooseRules;

  return (
    <CardContent>
      <Grid
        justify="space-between"
        alignItems="flex-end"
        container
        spacing={2}
      >
        <Grid xs item>
          {selectRules.length}
          Selected
        </Grid>
        <Grid item>
          <Button onClick={onApplayChooseRules} color="primary">
            {t('optimizers:select:uncheck_all')}
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  );
}

export default observer(ListRulesFooter);
