import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState, useEffect, useRef } from 'react';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';
import { DATE_MAIN_FORMAT } from 'config/constants';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles';

function useDateRangePickerDropDown(onChange, startDate, endDate) {
  const { t } = useTranslation();
  const theme = useTheme();
  const dateRangePickerSettings = {
    rangeColors: [theme.palette.primary.light],
    showSelectionPreview: true,
    months: 2,
    direction: 'horizontal',
    moveRangeOnFirstSelection: false,
  };
  const classes = useStyles();
  const mainWrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  let toggleActiveClass = '';
  const onChangeDateHandler = ({ range1 }) =>
    onChange({
      ...range1,
    });
  const visibleInputDate = `${format(
    startDate,
    DATE_MAIN_FORMAT,
  )} - ${format(endDate, DATE_MAIN_FORMAT)}`;
  const onClickButtonHandler = () => setIsOpen(!isOpen);
  const handleClickOutside = event => {
    if (
      mainWrapperRef.current &&
      !mainWrapperRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  if (mainWrapperRef.current) {
    toggleActiveClass = isOpen
      ? classes.datePickerWrapperSlideIn
      : classes.datePickerWrapperSlideOut;
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return {
    visibleInputDate,
    onClickButtonHandler,
    mainWrapperRef,
    toggleActiveClass,
    onChangeDateHandler,
    dateRangePickerSettings,
    classes,
    t,
  };
}

export default useDateRangePickerDropDown;
