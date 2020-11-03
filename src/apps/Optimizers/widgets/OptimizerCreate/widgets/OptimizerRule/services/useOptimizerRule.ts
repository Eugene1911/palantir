import { useState } from 'react';

export type TUseOptimizerRule = {
  isOpenCondition: boolean;
  onToggleConditionHandler: () => void;
};

function useOptimizerRule(): TUseOptimizerRule {
  const [isOpenCondition, setIsOpenCondition] = useState(false);
  const onToggleConditionHandler = (): void =>
    setIsOpenCondition(!isOpenCondition);

  return {
    isOpenCondition,
    onToggleConditionHandler,
  };
}

export default useOptimizerRule;
