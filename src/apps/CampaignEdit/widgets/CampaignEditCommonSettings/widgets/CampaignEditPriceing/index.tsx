import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import CampaignDcpmTypeSelect from 'sharedComponents/CampaignDcpmTypeSelect';
import CampaignStretchTimeTypeSelect from 'sharedComponents/CampaignStretchTimeTypeSelect';
import QuestionTooltip from 'sharedComponents/QuestionTooltip';
import useStyles from './useStyles';

function CampaignEditPriceing(): JSX.Element {
  const classes = useStyles({});
  const [
    campaignDcpmTypeSelect,
    setCampaignDcpmTypeSelect,
  ] = useState(0);

  return (
    <>
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>
            Type
            <QuestionTooltip title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <CampaignDcpmTypeSelect
            value={campaignDcpmTypeSelect}
            onChange={(value): void =>
              setCampaignDcpmTypeSelect(value)
            }
          />
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Max CPM bid</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl>
            <Input
              id="partner_networks_cpmv"
              value={1}
              rows="3"
              style={{ width: '104px' }}
              type="number"
              inputProps={{
                step: 0.1,
                className: 'global-text-align-right',
              }}
              onChange={event =>
                console.log(
                  'partner_networks_cpmv - >',
                  event.target.value,
                )
              }
            />
            <FormHelperText>
              top CPM: 0.0003 USD, minimum bid: 0.3 USD
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>
            Daily Budget
            <QuestionTooltip title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <Input
              id="partner_networks_cpmv"
              value={1}
              rows="3"
              style={{ width: '104px' }}
              type="number"
              inputProps={{
                step: 0.1,
                className: 'global-text-align-right',
              }}
              onChange={event =>
                console.log(
                  'partner_networks_cpmv - >',
                  event.target.value,
                )
              }
            />
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>
            Distribution
            <QuestionTooltip title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <CampaignStretchTimeTypeSelect
            value={campaignDcpmTypeSelect}
            onChange={(value): void =>
              setCampaignDcpmTypeSelect(value)
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

export default CampaignEditPriceing;
