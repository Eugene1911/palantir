import { useReducer } from 'react';
import authReducer from './authReducer';
import authReuqest from './authActions';

const initAuthReducerState = {
  isFetching: false,
  error: null,
};
function useAuthReducer() {
  const [
    onSubmitAuthFormState,
    dispatchSubmitAuthFormState,
  ] = useReducer(authReducer, initAuthReducerState);
  const onSubmitAuthForm = (event, authForm) => {
    event.preventDefault();
    authReuqest(dispatchSubmitAuthFormState, authForm);
  };

  return {
    onSubmitAuthFormState,
    onSubmitAuthForm,
  };
}

export default useAuthReducer;
