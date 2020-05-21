import { types, Instance } from 'mobx-state-tree';

const NotifierStore = types
  .model('NotifierStore', {
    notifications: types.optional(types.frozen(), []),
  })
  .actions((self: any) => ({
    pushSnackbar: (note: any): void => {
      self.notifications = [
        {
          key: new Date().getTime() + Math.random(),
          ...note,
        },
      ];
    },

    removeSnackbar: (note: any): void => {
      self.notifications.remove(note);
    },
  }));

export type INotifierStore = Instance<typeof NotifierStore>;

export default NotifierStore;
