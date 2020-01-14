import 'typeface-roboto';
import 'config/i18n';
import React, { Suspense } from 'react';
import { Provider } from 'mobx-react';
import globalStyles from 'themes/global.styles';
import SuspenseFallbackMain from 'sharedComponents/SuspenseFallbackMain';

function WrapperStartAppComponent({ store, children }) {
  globalStyles();

  return (
    <Provider {...store}>
      <Suspense fallback={<SuspenseFallbackMain />}>
        {children}
      </Suspense>
    </Provider>
  );
}

export default WrapperStartAppComponent;
