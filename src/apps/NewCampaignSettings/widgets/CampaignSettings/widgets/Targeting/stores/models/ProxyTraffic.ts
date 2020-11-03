import { Instance, types } from 'mobx-state-tree';
import { ProxyTrafficTypes } from '../../constants/proxyTrafficTypes';

export const InitialProxyTrafficModel = {
  proxyTrafficRadio: ProxyTrafficTypes.ALL,
};

const ProxyTrafficModel = types
  .model({
    proxyTrafficRadio: types.enumeration<ProxyTrafficTypes>(
      Object.values(ProxyTrafficTypes),
    ),
  })
  .actions(self => ({
    setProxyTrafficRadio(proxyTrafficRadio: ProxyTrafficTypes): void {
      self.proxyTrafficRadio = proxyTrafficRadio;
    },
  }));

export type TProxyTrafficModel = Instance<typeof ProxyTrafficModel>;

export default ProxyTrafficModel;
