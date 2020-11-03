import { Instance, types } from 'mobx-state-tree';
import CountriesModel, {
  InitialCountriesModel,
} from './models/Countries';
import BrowsersModel, {
  InitialBrowsersModel,
} from './models/Browsers';
import CarriersModel, {
  InitialCarriersModel,
} from './models/Carriers';
import DeviceBrandsModel, {
  InitialDeviceBrandsModel,
} from './models/DeviceBrands';
import DevicesModel, { InitialDevicesModel } from './models/Devices';
import LanguagesModel, {
  InitialLanguagesModel,
} from './models/Languages';
import OperatingSystemsModel, {
  InitialOperatingSystemsModel,
} from './models/OperatingSystems';
import ModelPriceModel, {
  InitialModelPriceModel,
} from './models/ModelPrice';
import DeviceReleaseDateModel, {
  InitialDeviceReleaseDateModel,
} from './models/DeviceReleaseDate';
import ProxyTrafficModel, {
  InitialProxyTrafficModel,
} from './models/ProxyTraffic';
import KeywordsModel, {
  InitialKeywordsModel,
} from './models/Keywords';
import IPRangesModel, {
  InitialIPRangesModel,
} from './models/IPRanges';

export const InitialTargetingModel = {
  isAdvancedOpen: false,
  browsers: InitialBrowsersModel,
  carriers: InitialCarriersModel,
  countries: InitialCountriesModel,
  deviceBrands: InitialDeviceBrandsModel,
  deviceReleaseDate: InitialDeviceReleaseDateModel,
  devices: InitialDevicesModel,
  languages: InitialLanguagesModel,
  operatingSystems: InitialOperatingSystemsModel,
  modelPrice: InitialModelPriceModel,
  proxyTraffic: InitialProxyTrafficModel,
  keywords: InitialKeywordsModel,
  ipRanges: InitialIPRangesModel,
};

const TargetingModel = types
  .model({
    isAdvancedOpen: types.boolean,
    browsers: BrowsersModel,
    carriers: CarriersModel,
    countries: CountriesModel,
    deviceBrands: DeviceBrandsModel,
    deviceReleaseDate: DeviceReleaseDateModel,
    devices: DevicesModel,
    languages: LanguagesModel,
    operatingSystems: OperatingSystemsModel,
    modelPrice: ModelPriceModel,
    proxyTraffic: ProxyTrafficModel,
    keywords: KeywordsModel,
    ipRanges: IPRangesModel,
  })
  .actions(self => ({
    toggleIsAdvancedOpen(): void {
      self.isAdvancedOpen = !self.isAdvancedOpen;
    },
  }));

export type TTargetingModel = Instance<typeof TargetingModel>;

export default TargetingModel;
