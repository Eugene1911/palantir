import React, { ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';

import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { TSettingsModel } from '../../../../stores/SettingsStore';
import useStyles from './useStyles';
import { AddMode } from '../../../../constants/addMode';

interface ICategoriesFilterProps {
  settings?: TSettingsModel;
}

const CategoriesFilter = ({
  settings,
}: ICategoriesFilterProps): JSX.Element => {
  const classes = useStyles();

  const toggleActiveCategory = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    settings.toggleActiveCategory(event.target.name);
  };

  return (
    <Grid
      container
      justify="space-between"
      wrap="nowrap"
      className={classes.container}
    >
      <Grid className={classes.switchWrapper} item container>
        <FormGroup row>
          {Array.from(settings.categoriesList.values()).map(value => (
            <FormControlLabel
              key={value.id}
              control={
                <Switch
                  checked={value.active}
                  onChange={toggleActiveCategory}
                  name={value.id.toString()}
                  color="primary"
                />
              }
              label={value.name}
              labelPlacement="start"
              className={classes.switch}
            />
          ))}
        </FormGroup>
      </Grid>
      <Grid item>
        <Button
          className={cn(classes.blackList, {
            [classes.activeBlackListButton]:
              settings.addMode === AddMode.BLACKLIST,
          })}
          onClick={(): void => settings.toggleAddMode()}
        >
          <AddIcon className={classes.addIcon} />
          ADD Tags to blacklist
        </Button>
      </Grid>
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  settings: newCampaignSettings.settings,
}))(observer(CategoriesFilter));
