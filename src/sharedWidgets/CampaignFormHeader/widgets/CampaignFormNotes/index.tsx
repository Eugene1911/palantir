import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { LoadingStatus } from 'sharedTypes';
import DescriptionIcon from '@material-ui/icons/Description';
import useStyles from './useStyles';
import { TNotesModel } from '../../stores/models/NotesModel';
import NotesDrawer from './components/NotesDrawer';

interface ICampaignFormNotesProps {
  notes?: TNotesModel;
  campaignId?: number;
}

const CampaignFormNotes = ({
  notes,
  campaignId,
}: ICampaignFormNotesProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = (): void => setIsOpen(prevOpen => !prevOpen);

  useEffect(() => {
    if (notes.notesStatus === LoadingStatus.INITIAL && campaignId) {
      notes.getNotesByCampaignId(infoNotification, campaignId);
    }
  });

  return (
    <>
      <Button
        color="primary"
        className={classes.button}
        startIcon={<DescriptionIcon color="primary" />}
        onClick={toggleOpen}
      >
        Notes
      </Button>

      <NotesDrawer onCancel={toggleOpen} isOpen={isOpen} />
    </>
  );
};

export default inject(({ campaignFormHeader }) => ({
  notes: campaignFormHeader.notes,
}))(observer(CampaignFormNotes));
