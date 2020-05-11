import { useState } from 'react';
import isArray from 'lodash/isArray';
import union from 'lodash/union';
import textToArrayWithCheck from 'helpers/textToArrayWithCheck';
import { KEY_ENTER_CODE } from 'config/constants';
import useStyles, {
  TIncludeExcludeSwitchListClasses,
} from '../useStyles';

const SWITCH_BUTTON_NAMES = {
  include: 'Include',
  exclude: 'Exclude',
};
const includeExcludeButtons = [
  SWITCH_BUTTON_NAMES.include,
  SWITCH_BUTTON_NAMES.exclude,
];

type TuseIncludeExcludeSwitchList = {
  inputText: string;
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onKeyPressHandler: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  includeExcludeButtons: string[];
  switchValue: string;
  setSwitchValue: (value: string) => void;
  classes: Record<TIncludeExcludeSwitchListClasses, string>;
  getButtonClass: (name: string) => string;
  onDeleteWordHandler: (keyword: string) => void;
  onClickRemoveAllHandler: () => void;
};

type TuseIncludeExcludeSwitchListProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

function useIncludeExcludeSwitchList({
  value,
  onChange,
}: TuseIncludeExcludeSwitchListProps): TuseIncludeExcludeSwitchList {
  const [switchValue, setSwitchValue] = useState(
    SWITCH_BUTTON_NAMES.include,
  );
  const [inputText, setInputText] = useState('');
  const classes = useStyles({
    isExclude: switchValue === SWITCH_BUTTON_NAMES.exclude,
  });
  const getButtonClass = (name: string): string => {
    const isActive = name === switchValue;

    if (isActive && name === SWITCH_BUTTON_NAMES.include)
      return classes.activeColor;
    if (isActive && name === SWITCH_BUTTON_NAMES.exclude)
      return classes.activeExclideColor;

    return classes.defaultColor;
  };
  const onChangeHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setInputText(target.value);
  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    const { key } = event;

    if (key === KEY_ENTER_CODE) {
      const words = textToArrayWithCheck(inputText, value);

      event.preventDefault();

      if (isArray(words)) {
        onChange(union(value, words));
      }

      setInputText('');
    }
  };
  const onDeleteWordHandler = (deleteWord: string): void =>
    onChange(value.filter(word => word !== deleteWord));
  const onClickRemoveAllHandler = (): void => onChange([]);

  return {
    inputText,
    classes,
    onChangeHandler,
    onKeyPressHandler,
    onClickRemoveAllHandler,
    switchValue,
    setSwitchValue,
    getButtonClass,
    onDeleteWordHandler,
    includeExcludeButtons,
  };
}

export default useIncludeExcludeSwitchList;
