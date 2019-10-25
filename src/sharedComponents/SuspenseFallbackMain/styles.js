import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    zIndex: '10000',
    background: 'rgba(255,255,255,0.5)',
  },
});

export default useStyles;
