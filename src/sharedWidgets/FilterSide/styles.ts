import { makeStyles, Theme } from '@material-ui/core/styles';

type TFilterSideStyleProps = { isDrawerOpen: boolean; width: number };

const useStyles = makeStyles<
  Theme,
  TFilterSideStyleProps,
  TFilterSideStyleClasses
>((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: (props: TFilterSideStyleProps): string =>
        props.isDrawerOpen ? `${props.width}px` : '',
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: ({ width }): string => `${width}px`,
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: 0,
  },
  header: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '16px',
    paddingBottom: '10px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export type TFilterSideStyleClasses =
  | 'drawer'
  | 'drawerPaper'
  | 'header'
  | 'closeButton';
export default useStyles;
