import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStores, { TOptimizersStors } from '../../../store';

export type TUseOptimizerCreate = {
  isCreate: boolean;
};

function useOptimizerCreate(): TUseOptimizerCreate {
  const { optimizerCreateStore }: TOptimizersStors = useStores();
  const { id }: { id: string } = useParams();
  const isCreate = !!id;

  useEffect(() => {
    optimizerCreateStore.loadResources(id);
  }, []);

  return {
    isCreate,
  };
}

export default useOptimizerCreate;
