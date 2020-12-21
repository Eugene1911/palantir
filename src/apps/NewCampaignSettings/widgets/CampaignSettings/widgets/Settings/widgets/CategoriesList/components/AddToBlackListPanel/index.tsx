import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';
import { TCategoriesModel } from '../../../../stores/models/Categories';

interface IAddToBlackListPanelProps {
  categories?: TCategoriesModel;
}

const AddToBlackListPanel = ({
  categories,
}: IAddToBlackListPanelProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Grid
        className={classes.container}
        container
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item>
          <Typography component="span">
            Select the tags on top you want to add to the Blacklist.
            Added tags will be highlighted in red.
          </Typography>
          <Typography component="span">
            {' '}
            {categories.tempBlackListTags.length} selected
          </Typography>
        </Grid>
        <Grid item container className={classes.buttons}>
          <Button
            onClick={(): void => categories.toggleAddMode()}
            className={classes.cancel}
          >
            Cancel
          </Button>
          <Button
            onClick={(): void => categories.toggleAddMode(true)}
            variant="contained"
            color="primary"
          >
            Done
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  categories: newCampaignSettings.settings.categories,
}))(observer(AddToBlackListPanel));
