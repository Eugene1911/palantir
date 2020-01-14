import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import InputAdornment from '@material-ui/core/InputAdornment';
import DateRange from '@material-ui/icons/DateRange';
import IconButton from '@material-ui/core/IconButton';
import { DateRangePicker } from 'react-date-range';
import useDateRangePickerDropDown from './useDateRangePickerDropDown';

function DateRangePickerDropDown({ onChange, startDate, endDate }) {
  const {
    visibleInputDate,
    mainWrapperRef,
    onClickButtonHandler,
    toggleActiveClass,
    onChangeDateHandler,
    dateRangePickerSettings,
    classes,
    t,
  } = useDateRangePickerDropDown(onChange, startDate, endDate);

  return (
    <FormControl
      fullWidth
      ref={mainWrapperRef}
      className={classes.main}
    >
      <TextField
        value={visibleInputDate}
        label={t('common:form.date_range')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onClickButtonHandler}>
                <DateRange />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div
        className={`${classes.datePickerWrapper} ${toggleActiveClass}`}
      >
        <Paper>
          <DateRangePicker
            {...dateRangePickerSettings}
            ranges={[
              {
                startDate,
                endDate,
              },
            ]}
            onChange={onChangeDateHandler}
          />
        </Paper>
      </div>
    </FormControl>
  );
}

DateRangePickerDropDown.propTypes = {
  endDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
};

DateRangePickerDropDown.defaultProps = {
  endDate: new Date(),
  startDate: new Date(),
};

export default DateRangePickerDropDown;
