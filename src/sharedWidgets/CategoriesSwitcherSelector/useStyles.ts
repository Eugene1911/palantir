import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<
  Theme,
  TCategoriesSwitcherSelectorClasses
>((theme: Theme) => ({
  switch: {
    paddingLeft: '11px',
    paddingBottom: '5px',
  },
  chip: {
    marginBottom: '5px',
    marginRight: '5px',
  },
  chipWrapper: {
    marginTop: '5px',
    marginBottom: '5px',
    transition: `height ${theme.transitions.duration.standard}ms linear`,
    overflow: 'hidden',
  },
}));

export type TCategoriesSwitcherSelectorClasses =
  | 'chip'
  | 'switch'
  | 'chipWrapper';

export default useStyles;
