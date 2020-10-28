import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import useStores from './store';

function StoreProvider({
  children,
  ...propsValue
}: any): JSX.Element {
  const contextValue = useStores();
  const valueRef = React.useRef();

  if (!valueRef.current) {
    valueRef.current = {
      ...contextValue,
      ...propsValue,
    };
  }

  const value = valueRef.current;

  return (
    <MobXProviderContext.Provider value={value}>
      {children}
    </MobXProviderContext.Provider>
  );
}

export default StoreProvider;
