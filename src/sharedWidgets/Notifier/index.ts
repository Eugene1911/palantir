import { inject, observer } from 'mobx-react';
import useNotifier from './services/useNotifier';

type INotifierProps = {
  notifications?: Array<any>;
};

function Notifier(props: INotifierProps): JSX.Element {
  useNotifier(props);

  return null;
}

export default inject(({ notifierStore }: any) => notifierStore)(
  observer(Notifier),
);
