import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    position: 'relative',
  },
  datePickerWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: '50px',
    left: '-5px',
    fontFamily: theme.typography.fontFamily,
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    padding: '5px',

    '& .rdrDayNumber span:after': {
      background: theme.palette.primary.light,
    },
  },
  datePickerWrapperSlideIn: {
    height: 'auto',
    opacity: 1,
    animation:
      '$slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both',
  },
  datePickerWrapperSlideOut: {
    height: 0,
    opacity: 0,
    animation: '$slide-in-blurred-out-top 0.5s ease-in-out',
  },
  '@keyframes slide-in-blurred-top': {
    '0%': {
      transform: 'translateY(-150px)',
      filter: 'blur(40px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0) ',
      filter: 'blur(0)',
      opacity: 1,
    },
  },
  '@keyframes slide-in-blurred-out-top': {
    '0%': {
      transform: 'translateY(0)',
      filter: 'blur(0)',
      opacity: 1,
      height: 'auto',
    },
    '100%': {
      transform: 'translateY(-150px) ',
      filter: 'blur(40px)',
      height: 0,
      opacity: 0,
    },
  },
}));

export default useStyles;
