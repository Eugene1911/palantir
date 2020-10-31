import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  TCategoriesGroupByParentIdModel,
  TSettingsModel,
} from '../../../../stores/SettingsStore';
import CustomChip from '../../../../../../components/CustomChip';
import useStyles from './useStyles';

interface ICategorySectionProps {
  settings?: TSettingsModel;
  section: TCategoriesGroupByParentIdModel;
}

const CategorySection = ({
  settings,
  section,
}: ICategorySectionProps): JSX.Element => {
  const classes = useStyles();

  const toggleSelectedTag = (
    tagId: number,
    categoryId: number,
  ): void => {
    settings.toggleSelectedTag(tagId, categoryId);
  };

  return (
    <>
      <Typography className={classes.categoryName}>
        {section.name}
      </Typography>
      <Grid container>
        {section.categories.map(tag => (
          <CustomChip
            key={tag.id}
            onClick={(): void =>
              toggleSelectedTag(tag.id, tag.parent_id)
            }
            label={tag.name}
            isActive={tag.selected}
            isError={tag.inBlackList || tag.inTempBlackList}
          />
        ))}
      </Grid>
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  settings: newCampaignSettings.settings,
}))(observer(CategorySection));
