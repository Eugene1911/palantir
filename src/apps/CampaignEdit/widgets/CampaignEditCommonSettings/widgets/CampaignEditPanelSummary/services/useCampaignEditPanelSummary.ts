import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GridSize } from '@material-ui/core/Grid';
import useStyles, {
  TCampaignEditPanelSummaryClasses,
} from '../useStyles';

type TUseCampaignEditPanelSummaryProps = {
  isSelected: boolean;
};

export type TUseCampaignEditPanelSummary = {
  classes: Record<TCampaignEditPanelSummaryClasses, string>;
  gridCountInfoColumn: GridSize;
};

function useCampaignEditPanelSummary({
  isSelected,
}: TUseCampaignEditPanelSummaryProps): TUseCampaignEditPanelSummary {
  const classes = useStyles({
    isSelected,
  });
  const { breakpoints } = useTheme();
  const isBreakpointsMd = useMediaQuery(
    `(max-width: ${breakpoints.values.sm}px)`,
  );
  const gridCountInfoColumn = isBreakpointsMd ? 6 : 3;

  return {
    classes,
    gridCountInfoColumn,
  };
}

export default useCampaignEditPanelSummary;
