import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TKeywordsChipsClasses>({
  chips: {
    margin: '0 5px 5px 0',
  },
  chipsWrapper: {
    marginTop: '10px',
    overflow: 'scroll',
    maxHeight: '140px',
  },
});

type TKeywordsChipsClasses = 'chips' | 'chipsWrapper';

export default useStyles;
