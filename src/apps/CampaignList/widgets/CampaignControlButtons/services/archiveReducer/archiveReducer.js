import ARCHIVE_TYPE from './archiveTypeActions';

export const initArchiveReducer = {
  isFetching: false,
};

export function archiveReducer(state, acton) {
  switch (acton.type) {
    case ARCHIVE_TYPE.BEGIN:
      return {
        ...state,
        isFetching: true,
      };

    case ARCHIVE_TYPE.SUCCESS:
      return {
        ...state,
        payload: acton.payload,
        isFetching: false,
      };

    case ARCHIVE_TYPE.FAILURE:
      return {
        ...initArchiveReducer,
        payload: acton.error,
        isFetching: false,
      };

    default:
      return state;
  }
}
