import { Instance, types } from 'mobx-state-tree';

export const InitialNotesModel = {
  notes: '',
};

const NotesModel = types
  .model({
    notes: types.string,
  })
  .actions(self => ({
    setNotes(notes: string): void {
      self.notes = notes;
    },
  }));

export type TNotesModel = Instance<typeof NotesModel>;

export default NotesModel;
