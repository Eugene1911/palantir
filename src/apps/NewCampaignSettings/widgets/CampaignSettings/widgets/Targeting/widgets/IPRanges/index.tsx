import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
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
              <FormControlLabel
                value={AllIncludeExclude.ALL}
                control={<Radio color="primary" />}
                label="ALL"
                className={classes.radio}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value={AllIncludeExclude.INCLUDE}
                control={<Radio color="primary" />}
                label="INCLUDE"
                className={classes.radio}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value={AllIncludeExclude.EXCLUDE}
                control={<Radio color="primary" />}
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
