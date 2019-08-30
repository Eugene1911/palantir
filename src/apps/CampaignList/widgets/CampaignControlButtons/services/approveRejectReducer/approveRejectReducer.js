import APPROVE_REJECT_TYPE from './approveRejectTypeActions';

export const initApproveRejectReducer = {
  isFetching: false,
};

export function approveRejectReducer(state, acton) {
  switch (acton.type) {
    case APPROVE_REJECT_TYPE.BEGIN:
      return {
        ...state,
        isFetching: true,
      };

    case APPROVE_REJECT_TYPE.SUCCESS:
      return {
        ...state,
        approvStatus: acton.approvStatus,
        isFetching: false,
      };

    case APPROVE_REJECT_TYPE.FAILURE:
      return {
        ...initApproveRejectReducer,
        isFetching: false,
      };

    default:
      return state;
  }
}
