import React, { useState, createRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { getApplications } from 'resources/api';
import { MAX_COUNT_SELECTED_ITEMS } from 'config/constants';

function useApplicationsMultiSelect(applicationsIds, onChange) {
  const [
    { selectedApplications, selectedApplicationsIds },
    setSelectedApplications,
  ] = useState({
    selectedApplications: [],
    selectedApplicationsIds: applicationsIds,
  });
  const { t } = useTranslation();
  const applicationsAutocompleteMultiSelectRef = createRef();
  const onSetSelectedApplicationsHandler = params => {
    onChange(params.selectedApplicationsIds);
    setSelectedApplications(params);
  };
  const onChangeApplicationHandler = (event, app) => {
    if (app) {
      const selectedIndex = selectedApplications.findIndex(
        ({ id }) => id === app.id,
      );

      if (selectedIndex !== -1) {
        selectedApplications.splice(selectedIndex, 1);
      } else {
        selectedApplications.push(app);
      }

      onSetSelectedApplicationsHandler({
        selectedApplicationsIds: selectedApplications.map(
          ({ id }) => id,
        ),
        selectedApplications,
      });
    }
  };

  const onChangeSeleactHandler = (event, { props }) => {
    const { value } = props;

    if (value === 'all') {
      onSetSelectedApplicationsHandler({
        selectedApplicationsIds: [],
        selectedApplications: [],
      });
    } else {
      onChangeApplicationHandler(null, { id: value });
    }
  };
  const onRenderValueHandler = selected => {
    if (!selected || !selected.length)
      return <Typography noWrap>{t('common:form.all')}</Typography>;

    const selectedLength = selected.length;

    if (selectedLength > MAX_COUNT_SELECTED_ITEMS) {
      return (
        <Typography noWrap>
          {`${t(
            'common:form.selected_applications',
          )}: ${selectedLength}`}
        </Typography>
      );
    }

    const applicationsSelectedList = selectedApplications
      .filter(({ id }) => selected.includes(id))
      .map(({ name }) => name)
      .join(', ');

    return <Typography noWrap>{applicationsSelectedList}</Typography>;
  };

  useEffect(() => {
    if (
      selectedApplicationsIds.length &&
      !selectedApplications.length
    ) {
      getApplications({
        id: selectedApplicationsIds,
      }).then(({ data }) =>
        setSelectedApplications({
          selectedApplicationsIds,
          selectedApplications: data.response,
        }),
      );
    }
  }, [
    selectedApplications.length,
    selectedApplicationsIds,
    selectedApplicationsIds.length,
  ]);

  return {
    t,
    selectedApplications,
    selectedApplicationsIds,
    setSelectedApplications,
    onChangeApplicationHandler,
    onChangeSeleactHandler,
    onRenderValueHandler,
    applicationsAutocompleteMultiSelectRef,
  };
}

export default useApplicationsMultiSelect;
