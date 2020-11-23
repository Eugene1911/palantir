import { Instance, types } from 'mobx-state-tree';
import isNil from 'lodash/isNil';
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
import { ITargetingResultData } from '../../../../../types/resultTypes';

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
    getResultData(): ITargetingResultData {
      /* eslint-disable @typescript-eslint/camelcase */
      return {
        countries: self.countries.getCategoriesResult(),
        geo_targets: self.countries.getItemsResult(),
        languages: self.languages.getResultData(),
        devices: self.devices.getResultData(),
        device_brands: self.deviceBrands.getCategoriesResult(),
        device_models: self.deviceBrands.getItemsResult(),
        ...(self.deviceReleaseDate.date && {
          device_release_date_offset: self.deviceReleaseDate.date,
        }),
        ...(!isNil(self.modelPrice.from) && {
          device_price_on_release_from: self.modelPrice.from,
        }),
        ...(!isNil(self.modelPrice.to) && {
          device_price_on_release_to: self.modelPrice.to,
        }),
        oses: self.operatingSystems.getCategoriesResult(),
        os_versions: self.operatingSystems.getItemsResult(),
        browsers: self.browsers.getCategoriesResult(),
        browser_versions: self.browsers.getItemsResult(),
        carriers: self.carriers.getResultData(),
        network_traffic_type: self.proxyTraffic.proxyTrafficRadio,
        ...self.ipRanges.getResultData(),
        keywords: self.keywords.list.toJS(),
      };
      /* eslint-enable @typescript-eslint/camelcase */
    },
  }));

export type TTargetingModel = Instance<typeof TargetingModel>;

export default TargetingModel;
