import React from 'react';

export interface IRawItem {
  item: string | JSX.Element;
  isDisabled: boolean;
}

interface IDTableProps {
  leftColumns: string[];
  // rightColumns: string[];
  // rawsSections: IRawItem[][][];
  // withCloseButton?: boolean;
  // withCheckbox?: boolean;
  // withAddButtonText?: boolean;
}

function IDTable(props?: IDTableProps): JSX.Element {
  console.log('IDTable props', props.leftColumns);

  return <></>;
}

export default IDTable;
