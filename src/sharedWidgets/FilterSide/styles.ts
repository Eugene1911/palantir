import { makeStyles, Theme } from '@material-ui/core/styles';

type TFilterSideStyleProps = { isDrawerOpen: boolean };

const drawerWidth: number = 300;
const useStyles = makeStyles<
  Theme,
  TFilterSideStyleProps,
  TFilterSideStyleClasses
>((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: (props: TFilterSideStyleProps): string =>
        props.isDrawerOpen ? `${drawerWidth}px` : '',
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: `${drawerWidth}px`,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

export type TFilterSideStyleClasses =
  | 'drawer'
  | 'drawerPaper'
  | 'closeButton';
export default useStyles;
