import { Instance, types } from 'mobx-state-tree';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
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
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      if (data.network_traffic_type) {
        self.setProxyTrafficRadio(data.network_traffic_type);
      }
    },
  }));

export type TProxyTrafficModel = Instance<typeof ProxyTrafficModel>;

export default ProxyTrafficModel;
