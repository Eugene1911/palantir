import React from 'react';
import cn from 'classnames';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useStyles from './useStyles';
import FilterLoader from '../../sharedComponents/loaders/FilterLoader';

export interface ICampaignActionsProps {
  onClickPrevious?: () => void;
  onSave: () => void;
  isSaveDisabled?: boolean;
  isLoading?: boolean;
  onSaveAsDraft: () => void;
  saveButtonText?: string;
}

const CampaignActions = ({
  onClickPrevious,
  onSave,
  isSaveDisabled = false,
  onSaveAsDraft,
  saveButtonText,
  isLoading = false,
}: ICampaignActionsProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid
      className={
        isLoading ? classes.loadingContainer : classes.container
      }
      container
      justify="space-between"
    >
      {isLoading ? (
        <FilterLoader />
      ) : (
        <>
          <Grid item>
            <Button
              className={classes.button}
              onClick={onSaveAsDraft}
              variant="outlined"
            >
              Save
            </Button>
          </Grid>
          {!!onClickPrevious && (
            <Grid item className={classes.previous}>
              <Button
                className={cn(classes.button, classes.previousButton)}
                onClick={onClickPrevious}
              >
                Previous
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={isSaveDisabled}
              onClick={onSave}
              className={cn(classes.button, classes.nextButton)}
              classes={{ endIcon: classes.nextIcon }}
              endIcon={
                saveButtonText ? (
                  undefined
                ) : (
                  <ChevronRightIcon
                    fontSize="large"
                    className={classes.icon}
                  />
                )
              }
            >
              {saveButtonText || 'Next'}
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CampaignActions;
