import { useState } from 'react';

const defaultAuthState = {
  email: '',
  paswword: '',
};

function useAuthState() {
  const [authForm, setAuthForm] = useState(defaultAuthState);
  const onChangeAuthFielsHandler = ({ target }) => {
    const { value, name } = target;

    setAuthForm({
      ...authForm,
      ...{
        [name]: value,
      },
    });
  };

  return { authForm, onChangeAuthFielsHandler };
}

export default useAuthState;
