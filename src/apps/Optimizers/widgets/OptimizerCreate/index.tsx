import React from 'react';
import { observer } from 'mobx-react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import HelpIcon from '@material-ui/icons/Help';
import { TCommonFetchingDataType } from 'sharedTypes';
import OptimizerLoader from 'sharedComponents/loaders/OptimizerLoader';
import LeavePageDialog from 'sharedComponents/LeavePageDialog';
import dateFnsFormat from 'helpers/dateFnsFormat';
import { DATE_DETAIL_FORMAT } from 'config/constants';
import DividerVertical from 'sharedComponents/DividerVertical';
import OptimizerGroupWrapper from './widgets/OptimizerGroup';
// import ChooseRules from '../ChooseRules';
import useStores, { TOptimizersStors } from '../../store';
import useOptimizerCreate, {
  TUseOptimizerCreate,
} from './services/useOptimizerCreate';
import useStyles from './useStyles';

function OptimizerCreate(): JSX.Element {
  const { optimizerCreateStore }: TOptimizersStors = useStores();
  const classes = useStyles();
  const {
    addItemToGroup,
    optimizer,
    isLoading,
    optimizerVariables,
    onCancelPageHandler,
    onDeleteGroupHandler,
    isShowLeaveDialog,
    onLeavePageDialogAgreeHandler,
    onLeavePageDialogCloseHandler,
  } = optimizerCreateStore;
  const { t } = useTranslation(['optimizers', 'common']);
  const { isCreate }: TUseOptimizerCreate = useOptimizerCreate();
  const title = optimizer.title || t('optimizers:create:title');

  if (!optimizerVariables || isLoading)
    return (
      <Paper>
        <CardContent>
          <OptimizerLoader />
        </CardContent>
      </Paper>
    );

  return (
    <Paper>
      {/* <ChooseRules /> */}
      {isShowLeaveDialog && (
        <LeavePageDialog
          isOpen={isShowLeaveDialog}
          onAgreeHandler={onLeavePageDialogAgreeHandler}
          onCloseHandler={onLeavePageDialogCloseHandler}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {title}
        </Typography>
        {optimizer.created_at && (
          <Grid container alignItems="center">
            <Typography className={classes.createDateLabel}>
              {t('optimizers:create:updated')}:
            </Typography>
            <Typography className={classes.createDate}>
              {dateFnsFormat(
                optimizer.updated_at,
                DATE_DETAIL_FORMAT,
              )}
            </Typography>
            <DividerVertical style={{ margin: '1px 10px' }} />
            <Typography className={classes.createDateLabel}>
              {t('optimizers:create:created')}:
            </Typography>
            <Typography className={classes.createDate}>
              {dateFnsFormat(
                optimizer.created_at,
                DATE_DETAIL_FORMAT,
              )}
            </Typography>
          </Grid>
        )}
      </CardContent>
      <br />
      <CardContent>
        <Grid spacing={3} alignItems="flex-end" container>
          <Grid item xs={3}>
            <Typography>
              {t('optimizers:create:name_and_period')}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              autoFocus={!isCreate}
              label={t('optimizers:create:optimazer_name')}
              onChange={optimizer.onEditTitleHandler}
              value={optimizer.title}
            />
          </Grid>
          <Grid item xs={2}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs>
                {optimizerVariables && (
                  <FormControl fullWidth>
                    <InputLabel>
                      {t('optimizers:create:period')}
                    </InputLabel>
                    <Select
                      fullWidth
                      value={optimizer.default_time_interval}
                      onChange={optimizer.onPeriodChangeHandler}
                    >
                      {optimizerVariables.date_ranges.map(
                        ({ id, name }: TCommonFetchingDataType) => (
                          <MenuItem key={id} value={id}>
                            {name}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                )}
              </Grid>
              <Grid item>
                <Tooltip
                  title={t('optimizers:create:period_tooltip')}
                  placement="top"
                >
                  <IconButton size="small">
                    <HelpIcon style={{ fontSize: '16px' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <OptimizerGroupWrapper
          groups={optimizer.rule_groups}
          onDeleteGroup={onDeleteGroupHandler}
        />
      </CardContent>
      <Divider />
      <CardContent>
        <Grid
          justify="space-between"
          spacing={2}
          alignItems="flex-start"
          container
        >
          <Grid item xs={6}>
            <Button
              onClick={addItemToGroup}
              startIcon={<GroupWorkIcon />}
              className={classes.addGroupButton}
              color="primary"
            >
              {t('optimizers:create:add_group')}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Grid
              justify="flex-end"
              spacing={2}
              alignItems="flex-end"
              container
            >
              <Grid item>
                <Button onClick={onCancelPageHandler} color="primary">
                  {t('common:form:cancel')}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={optimizer.onSaveOptimizerHandler}
                  variant="contained"
                  color="primary"
                >
                  {t('common:form:save')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  );
}

export default observer(OptimizerCreate);
