import { useState, createRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getApplications } from 'resources/api';
import clone from 'lodash/clone';

function useApplicationsMultiSelect(applicationsIds, onChange) {
  const { t } = useTranslation();
  const applicationsAutocompleteMultiSelectRef = createRef();
  const [selectedApplications, setSelectedApplications] = useState(
    [],
  );
  const onSetSelectedApplicationsHandler = (ids, applications) => {
    onChange(ids, applications);
    setSelectedApplications(applications);
  };
  const onChangeApplicationHandler = (event, app) => {
    if (app) {
      const selectApplications = clone(selectedApplications);
      const selectedIndex = selectApplications.findIndex(
        ({ id }) => id === app.id,
      );

      if (selectedIndex !== -1) {
        selectApplications.splice(selectedIndex, 1);
      } else {
        selectApplications.push(app);
      }

      onSetSelectedApplicationsHandler(
        selectApplications.map(({ id }) => id),
        selectApplications,
      );
    }
  };
  const onChangeSeleactHandler = (event, { props }) => {
    const { value } = props;

    if (value === 'all') {
      onSetSelectedApplicationsHandler([], []);
    } else {
      onChangeApplicationHandler(null, { id: value });
    }
  };

  useEffect(() => {
    if (applicationsIds.length && !selectedApplications.length) {
      getApplications({
        id: applicationsIds,
      }).then(({ data }) => {
        setSelectedApplications(data.response);
        onChange(applicationsIds, data.response);
      });
    }
  }, [
    applicationsIds,
    applicationsIds.length,
    onChange,
    selectedApplications.length,
  ]);

  useEffect(() => {
    if (
      selectedApplications.length &&
      applicationsIds.length !== selectedApplications.length
    ) {
      setSelectedApplications(
        selectedApplications.filter(({ id }) =>
          applicationsIds.includes(id),
        ),
      );
    }
  }, [applicationsIds, applicationsIds.length, selectedApplications]);

  return {
    t,
    selectedApplications,
    setSelectedApplications,
    onChangeApplicationHandler,
    onChangeSeleactHandler,
    applicationsAutocompleteMultiSelectRef,
  };
}

export default useApplicationsMultiSelect;
