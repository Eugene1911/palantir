import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCategorySectionClasses>(
  (theme: Theme) => ({
    categoryName: {
      fontSize: '12px',
      color: '#9b9b9b',
      margin: '24px 0 4px 0',
    },
    selectedTag: {
      margin: '8px 8px 0 0',
      fontSize: '14px',
      color: theme.palette.primary.main,
      border: 'solid 1px #e7e8f7',
      background: '#e7e8f7',
      '&:focus': {
        backgroundColor: '#e7e8f7 !important',
      },
    },
  }),
);

export type TCategorySectionClasses = 'categoryName' | 'selectedTag';

export default useStyles;
