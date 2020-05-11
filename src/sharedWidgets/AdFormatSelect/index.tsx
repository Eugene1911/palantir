import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useAdFormatSelect, {
  TUseAdFormatSelect,
} from './services/useAdFormatSelect';

type TAdFormatSelectProps = SelectProps;

function AdFormatSelect({
  onChange,
  value,
}: TAdFormatSelectProps): JSX.Element {
  const {
    adFormats,
    isLoadingAdFormats,
  }: TUseAdFormatSelect = useAdFormatSelect();

  if (isLoadingAdFormats) return <p>isLoadingAdFormats</p>;

  if (!adFormats || !adFormats.length) return <p>No Ad Format</p>;

  return (
    <FormControl fullWidth>
      <InputLabel shrink htmlFor="ad_format">
        Ad format
      </InputLabel>

      <Select
        displayEmpty
        name="ad_format"
        onChange={onChange}
        value={value}
      >
        {adFormats.map(({ name, id }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default AdFormatSelect;
