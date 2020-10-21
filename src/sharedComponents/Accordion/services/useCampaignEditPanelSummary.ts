import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GridSize } from '@material-ui/core/Grid';
import useStyles, {
  TCampaignEditPanelSummaryClasses,
} from '../useStyles';

interface IUseCampaignEditPanelSummaryProps {
  isExpanded: boolean;
}

export interface IUseCampaignEditPanelSummary {
  classes: Record<TCampaignEditPanelSummaryClasses, string>;
  gridCountInfoColumn: GridSize;
}

function useCampaignEditPanelSummary({
  isExpanded,
}: IUseCampaignEditPanelSummaryProps): IUseCampaignEditPanelSummary {
  const classes = useStyles({
    isExpanded,
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
