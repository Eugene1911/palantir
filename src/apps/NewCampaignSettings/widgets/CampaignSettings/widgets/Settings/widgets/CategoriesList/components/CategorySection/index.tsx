import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CustomChip from '../../../../../../components/CustomChip';
import useStyles from './useStyles';
import {
  TCategoriesModel,
  TCategoriesGroupByParentIdModel,
} from '../../../../stores/models/Categories';

interface ICategorySectionProps {
  categories?: TCategoriesModel;
  section: TCategoriesGroupByParentIdModel;
}

const CategorySection = ({
  categories,
  section,
}: ICategorySectionProps): JSX.Element => {
  const classes = useStyles();

  const toggleSelectedTag = (
    tagId: number,
    categoryId: number,
  ): void => {
    categories.toggleSelectedTag(tagId, categoryId);
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
  categories: newCampaignSettings.settings.categories,
}))(observer(CategorySection));
