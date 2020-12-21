import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import CustomFormControlLabel from 'sharedComponents/CustomFormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import useStyles from './useStyles';
import { TIPRangesModel } from '../../stores/models/IPRanges';
import { AllIncludeExclude } from '../../constants/allIncludeExclude';
import TagsListWithEnter from '../../components/TagsListWithEnter';

interface IIPRangesProps {
  ipRanges?: TIPRangesModel;
}

const IPRanges = ({ ipRanges }: IIPRangesProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <FormControl component="fieldset">
        <RadioGroup
          name="ipRanges"
          value={ipRanges.radio}
          onChange={(evt): void =>
            ipRanges.setRadio(evt.target.value as AllIncludeExclude)
          }
        >
          <Grid container>
            <Grid item>
              <CustomFormControlLabel
                groupValue={ipRanges.radio}
                value={AllIncludeExclude.ALL}
                label="ALL"
                className={classes.radio}
              />
            </Grid>
            <Grid item>
              <CustomFormControlLabel
                groupValue={ipRanges.radio}
                value={AllIncludeExclude.INCLUDE}
                label="INCLUDE"
                className={classes.radio}
              />
            </Grid>
            <Grid item>
              <CustomFormControlLabel
                groupValue={ipRanges.radio}
                value={AllIncludeExclude.EXCLUDE}
                label="EXCLUDE"
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>

      {ipRanges.radio === AllIncludeExclude.INCLUDE && (
        <Box className={classes.container}>
          <TagsListWithEnter
            list={ipRanges.list}
            onEnter={ipRanges.setTags}
            onDelete={ipRanges.deleteTag}
            onClearAll={ipRanges.clearAll}
            isError={false}
            label="Include IP ranges"
            tagsCount={ipRanges.tagsCount}
          />
        </Box>
      )}

      {ipRanges.radio === AllIncludeExclude.EXCLUDE && (
        <Box className={classes.container}>
          <TagsListWithEnter
            list={ipRanges.excludeList}
            onEnter={ipRanges.setTags}
            onDelete={ipRanges.deleteTag}
            onClearAll={ipRanges.clearAll}
            isError
            label="Exclude IP ranges"
            tagsCount={ipRanges.tagsCount}
          />
        </Box>
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  ipRanges: newCampaignSettings.targeting.ipRanges,
}))(observer(IPRanges));
