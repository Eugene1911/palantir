import { useEffect, useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { autorun } from 'mobx';

type TUseNotifierProps = {
  notifications?: Array<any>;
};

function useNotifier({ notifications }: TUseNotifierProps): void {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [displayed, setDisplayed] = useState([]);
  const storeDisplayed = useCallback(
    (id: string): void => {
      setDisplayed([displayed, id]);
    },
    [displayed],
  );
  useEffect(() => {
    autorun(() => {
      notifications.forEach((notification: any): void => {
        if (displayed.includes(notification.key)) return;

        enqueueSnackbar(notification.message, notification.options);
        storeDisplayed(notification.key);
        closeSnackbar(notification.key);
      });
    });
  }, [
    closeSnackbar,
    displayed,
    enqueueSnackbar,
    notifications,
    storeDisplayed,
  ]);
}

export default useNotifier;
