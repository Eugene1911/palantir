import { makeStyles, Theme, fade } from '@material-ui/core/styles';

type TIncludeExcludeSwitchListProps = {
  isExclude: boolean;
};

const useStyles = makeStyles<
  Theme,
  TIncludeExcludeSwitchListProps,
  TIncludeExcludeSwitchListClasses
>((theme: Theme) => ({
  defaultColor: {
    backgroundColor: theme.palette.grey[300],
  },
  activeColor: {
    backgroundColor: theme.palette.primary.main,
  },
  activeExclideColor: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  chipOutlined: {
    margin: '0 5px 5px 0',
    borderColor: ({
      isExclude,
    }: TIncludeExcludeSwitchListProps): string =>
      isExclude
        ? theme.palette.error.main
        : theme.palette.primary.main,
  },
  chipsContainer: {
    position: 'relative',
    paddingRight: '10px',
  },
  chipsCloseButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  chipDeleteIconSmall: {
    color: ({ isExclude }: TIncludeExcludeSwitchListProps): string =>
      isExclude
        ? fade(theme.palette.error.main, 0.7)
        : fade(theme.palette.primary.main, 0.7),
    '&:hover, &:active': {
      color: ({
        isExclude,
      }: TIncludeExcludeSwitchListProps): string =>
        isExclude
          ? theme.palette.error.main
          : theme.palette.primary.main,
    },
  },
  chipsWrapper: {
    marginTop: '10px',
    overflow: 'scroll',
    maxHeight: '140px',
  },
}));

export type TIncludeExcludeSwitchListClasses =
  | 'defaultColor'
  | 'activeColor'
  | 'chipsCloseButton'
  | 'chipsContainer'
  | 'chipOutlined'
  | 'chipsWrapper'
  | 'chipDeleteIconSmall'
  | 'activeExclideColor';

export default useStyles;
