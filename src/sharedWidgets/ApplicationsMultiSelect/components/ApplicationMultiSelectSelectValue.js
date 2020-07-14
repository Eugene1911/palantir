import React from 'react';
import Typography from '@material-ui/core/Typography';
import { MAX_COUNT_SELECTED_ITEMS } from 'config/constants';

const ApplicationMultiSelectSelectValue = (
  selectedApplications,
  t,
) => selected => {
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

export default ApplicationMultiSelectSelectValue;
