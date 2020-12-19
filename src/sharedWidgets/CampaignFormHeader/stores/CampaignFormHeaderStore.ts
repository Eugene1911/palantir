import { Instance, types } from 'mobx-state-tree';
import NotesModel, { InitialNotesModel } from './models/NotesModel';

export const InitialCampaignFormHeaderStore = {
  name: '',
  notes: InitialNotesModel,
};

const CampaignFormHeaderStore = types
  .model({
    name: types.string,
    notes: NotesModel,
  })
  .actions(self => ({
    setName(name: string): void {
      self.name = name;
    },
  }));

export type TCampaignFormHeaderStore = Instance<
  typeof CampaignFormHeaderStore
>;

export default CampaignFormHeaderStore;
