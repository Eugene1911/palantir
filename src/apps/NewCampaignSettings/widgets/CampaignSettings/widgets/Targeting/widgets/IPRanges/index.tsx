import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
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
                control={<Radio />}
                label="ALL"
                className={classes.radio}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value={AllIncludeExclude.INCLUDE}
                control={<Radio />}
                label="INCLUDE"
                className={classes.radio}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value={AllIncludeExclude.EXCLUDE}
                control={<Radio />}
                label="EXCLUDE"
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>

      {ipRanges.radio === AllIncludeExclude.INCLUDE && (
        <TagsListWithEnter
          list={ipRanges.list}
          onEnter={ipRanges.setTags}
          onDelete={ipRanges.deleteTag}
          onClearAll={ipRanges.clearAll}
          isError={false}
          label="Include IP ranges"
          tagsCount={ipRanges.tagsCount}
        />
      )}

      {ipRanges.radio === AllIncludeExclude.EXCLUDE && (
        <TagsListWithEnter
          list={ipRanges.excludeList}
          onEnter={ipRanges.setTags}
          onDelete={ipRanges.deleteTag}
          onClearAll={ipRanges.clearAll}
          isError
          label="Exclude IP ranges"
          tagsCount={ipRanges.tagsCount}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  ipRanges: newCampaignSettings.targeting.ipRanges,
}))(observer(IPRanges));
