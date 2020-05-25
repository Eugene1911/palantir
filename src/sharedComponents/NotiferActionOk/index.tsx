import React from 'react';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

type NotiferActionOkProps = {
  notiferKey: string;
};

function NotiferActionOk({
  notiferKey,
}: NotiferActionOkProps): JSX.Element {
  const { closeSnackbar } = useSnackbar();
  return (
    <Button
      color="inherit"
      onClick={(): void => closeSnackbar(notiferKey)}
    >
      OK
    </Button>
  );
}

export const notiferActionOk = (key: string): JSX.Element => (
  <NotiferActionOk notiferKey={key} />
);

export default NotiferActionOk;
