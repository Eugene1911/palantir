import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { observer, inject } from 'mobx-react';
import useRejectReasonsState from './services/rejectReasonsState';

const CampaignRejactDialog = inject('rejectReasonsStore')(
  observer(
    ({
      campaignId,
      onClose,
      open,
      rejectReasonsStore,
      onHandlerRejectCampaign,
      ...other
    }) => {
      const {
        isOtherSelected,
        onCheckboxChangeHandler,
        onSaveReasonsHandler,
        onCommentTypeHandler,
        rejectReasonsListState,
        rejectReasonsList,
        isDisapproveFetching,
      } = useRejectReasonsState(
        rejectReasonsStore,
        campaignId,
        onClose,
        onHandlerRejectCampaign,
      );

      return (
        <Dialog fullWidth open={open} {...other}>
          <DialogTitle>Campaign reject reasons:</DialogTitle>
          {(rejectReasonsListState === 'pending' ||
            isDisapproveFetching) && <LinearProgress />}
          <DialogContent dividers>
            <RadioGroup>
              {rejectReasonsList.map(({ id, title }) => (
                <FormControlLabel
                  onChange={() => onCheckboxChangeHandler(id)}
                  value={id}
                  key={id}
                  control={<Checkbox />}
                  label={title}
                />
              ))}
            </RadioGroup>
          </DialogContent>
          {isOtherSelected && (
            <CardContent>
              <TextField
                fullWidth
                rowsMax={3}
                name="comment"
                label="Reject comment:"
                placeholder="Placeholder"
                onChange={onCommentTypeHandler}
                multiline
                margin="none"
              />
            </CardContent>
          )}
          <DialogActions>
            <Button onClick={() => onClose(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={onSaveReasonsHandler} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );
    },
  ),
);

export default CampaignRejactDialog;
