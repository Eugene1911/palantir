import { flow, Instance, types } from 'mobx-state-tree';
import { INotification, LoadingStatus } from 'sharedTypes';
import { getNotes } from 'resources/api';
import { errorsString } from '../../constants/strings';

export const InitialNotesModel = {
  notes: '',
  notesStatus: LoadingStatus.INITIAL,
};

const NotesModel = types
  .model({
    notes: types.string,
    notesStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
  })
  .actions(self => ({
    setNotes(notes: string): void {
      self.notes = notes;
    },
    getNotesByCampaignId: flow(function* getNotesByCampaignId(
      infoNotification: (arg: INotification) => void,
      id: number,
    ) {
      self.notesStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getNotes(id, {});
        self.notesStatus = LoadingStatus.SUCCESS;

        self.notes = data[0].text;
      } catch (error) {
        self.notesStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || errorsString.getNotes;

        infoNotification({
          variant: 'error',
          message,
        });
      }
    }),
  }));

export type TNotesModel = Instance<typeof NotesModel>;

export default NotesModel;
