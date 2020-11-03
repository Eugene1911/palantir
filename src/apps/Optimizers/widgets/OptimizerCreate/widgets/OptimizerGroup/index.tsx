import React from 'react';
import { observer } from 'mobx-react';
import Divider from '@material-ui/core/Divider';
import { v4 as uuidv4 } from 'uuid';
import { TOptimizerGroupModel } from './store/OptimizerGroupModel';
import OptimizerGroup from './group';

type TOptimizerGroupWrapperProps = {
  groups: TOptimizerGroupModel[];
  onDeleteGroup: (index: number) => void;
};

function OptimizerGroupWrapper({
  groups,
  onDeleteGroup,
}: TOptimizerGroupWrapperProps): JSX.Element {
  const isLastGroup: boolean = groups.length === 1;

  return (
    <>
      {groups.map((group, index: number) => (
        <div key={uuidv4()}>
          <Divider />
          <br />
          <OptimizerGroup
            group={group}
            isLastGroup={isLastGroup}
            index={index}
            onDeleteGroup={onDeleteGroup}
          />
          <br />
        </div>
      ))}
    </>
  );
}

export default observer(OptimizerGroupWrapper);
