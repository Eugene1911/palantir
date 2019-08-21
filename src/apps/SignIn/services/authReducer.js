import AUTH_TYPES_ACTIONS from './authTypesActions';

function authReducer(state, acton) {
  switch (acton.type) {
    case AUTH_TYPES_ACTIONS.BEGIN:
      return {
        ...state,
        isFetching: true,
      };

    case AUTH_TYPES_ACTIONS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: acton.payload,
      };

    case AUTH_TYPES_ACTIONS.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: acton.payload,
      };

    default:
      break;
  }
}

export default authReducer;
