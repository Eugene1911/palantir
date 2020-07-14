import { getTrafficTypes } from 'resources/api';
import withFetchingDataLoader from 'sharedWidgets/withFetchingDataLoader';
import { TCommonFetchingDataType } from 'sharedTypes';
/*
type TTrafficTypeSelectProps = {
  onChange: (value: string) => void;
  value: string;
};

function TrafficTypeSelect({
  onChange,
  value,
}: TTrafficTypeSelectProps): JSX.Element {
  return (
    <ButtonGroup size="medium" variant="contained">
      {TRAFFICS_TYPE.map(type => (
        <Button
          color={type.value === value ? 'primary' : 'default'}
          key={type.value}
          onClick={(): void => onChange(type.value)}
        >
          {type.name}
        </Button>
      ))}
    </ButtonGroup>
  );
}
*/

export default withFetchingDataLoader<TCommonFetchingDataType>(
  getTrafficTypes,
);
