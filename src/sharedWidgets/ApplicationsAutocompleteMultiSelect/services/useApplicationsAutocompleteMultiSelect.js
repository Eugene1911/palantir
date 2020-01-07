import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import TextField from '@material-ui/core/TextField';
import ProgressLoaderMultiSelect from 'sharedComponents/ProgressLoaderMultiSelect';
import { useTranslation } from 'react-i18next';
import { getApplications } from 'resources/api';

function useApplicationsAutocompleteMultiSelect() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [applicationsList, setApplicationsList] = useState([]);
  const [autoCompleteText, setAutoCompleteText] = useState('');
  const onChangeTextFieldHandler = ({ target }) =>
    setAutoCompleteText(target.value);
  const renderInputHandler = params => {
    return (
      <TextField
        {...params}
        label={t('common:form.search')}
        placeholder={t('common:form.search')}
        onChange={onChangeTextFieldHandler}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'disabled',
          value: autoCompleteText,
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              <ProgressLoaderMultiSelect isLoading={isLoading} />
              {params.InputProps.endAdornment}
            </>
          ),
        }}
        fullWidth
      />
    );
  };
  const debounceAutoCompleteText = useRef(null);

  useEffect(() => {
    if (autoCompleteText) {
      setIsLoading(true);

      if (debounceAutoCompleteText.current)
        debounceAutoCompleteText.current.cancel();
      debounceAutoCompleteText.current = debounce(
        () =>
          getApplications({
            url: autoCompleteText,
            name: autoCompleteText,
          }).then(({ data }) => {
            setApplicationsList(data.response);
            setIsLoading(false);
          }),
        1000,
      );

      debounceAutoCompleteText.current();
    }
  }, [autoCompleteText]);

  return {
    t,
    applicationsList,
    autoCompleteText,
    renderInputHandler,
    onChangeTextFieldHandler,
  };
}

export default useApplicationsAutocompleteMultiSelect;
