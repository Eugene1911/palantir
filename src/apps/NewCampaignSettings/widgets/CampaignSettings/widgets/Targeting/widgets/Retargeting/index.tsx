import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import useStyles from './useStyles';
import { TRetargetingModel } from '../../stores/models/Retargeting';
import { TEditStore } from '../../../../stores/EditStore';
import AllCustomRadio from '../../../../components/AllCustomRadio';

interface IRetargetingProps {
  retargeting?: TRetargetingModel;
  edit?: TEditStore;
}

const Retargeting = ({
  retargeting,
  edit,
}: IRetargetingProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const classes = useStyles();

  useEffect(() => {
    if (
      retargeting.retargetingRadio === AllCustomStatus.CUSTOM &&
      retargeting.retargetingStatus === LoadingStatus.INITIAL
    ) {
      retargeting.getRetargeting(infoNotification);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    retargeting.retargetingStatus,
    retargeting.retargetingRadio,
    retargeting.getRetargeting,
    infoNotification,
  ]);

  return edit.isEdit && !edit.isEditDraft ? (
    <>
      <AllCustomRadio
        onChange={retargeting.setRadio}
        value={retargeting.retargetingRadio}
        name="retargeting"
        allLabel="OFF"
      />
    </>
  ) : (
    <Grid container alignItems="center">
      <Grid item>
        <ErrorIcon className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography className={classes.text}>
          When the campaign will be created, you will be able to
          generate a retargeting pixel on the edit page.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  retargeting: newCampaignSettings.targeting.retargeting,
  edit: newCampaignSettings.edit,
}))(observer(Retargeting));
