import {
  isShowRoi,
  isPricingModelCPC,
  isPricingModelNotCPA,
} from './permissions';

// Fields list permissions
const tabelFieldsPermissionDenied = {
  clicks: [isPricingModelCPC, isShowRoi],
  net_potential: [isPricingModelNotCPA],
};

export default tabelFieldsPermissionDenied;
