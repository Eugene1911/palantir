import { types, flow } from 'mobx-state-tree';
import {
  getCampaignRejectReasons,
  putCampaignDisapprove,
} from 'resources/api';

export const RejectReasonModel = types.model('RejectReasonsList', {
  id: types.identifierNumber,
  title: types.string,
});

export const RejectReasonsStore = types
  .model('RejectReasonsStore', {
    rejectReasonsList: types.array(RejectReasonModel, null),
    rejectReasonsListState: types.optional(
      types.enumeration('State', ['pending', 'done', 'error', '']),
      '',
    ),
    isDisapproveFetching: types.optional(types.boolean, false),
  })
  .actions(self => ({
    setCampaignDisapprove: flow(function* loadRejectReasons(
      campaignId,
      props,
      onClose,
      infoNotification,
      onHandlerRejectCampaign,
    ) {
      self.isDisapproveFetching = true;

      try {
        const { data } = yield putCampaignDisapprove(
          campaignId,
          props,
        );

        self.isDisapproveFetching = false;
        infoNotification({
          variant: 'success',
          message: 'Campaign was rejected',
        });
        onHandlerRejectCampaign(data);
        onClose(false);
      } catch (error) {
        console.error('Failed to fetch projects', error);
        infoNotification({
          variant: 'error',
          message: 'Something went wrong',
        });
        self.isDisapproveFetching = false;
      }
    }),
    loadRejectReasonsList: flow(function* loadRejectReasons() {
      if (self.rejectReasonsListState) return;

      self.rejectReasonsListState = 'pending';

      try {
        const { data } = yield getCampaignRejectReasons();

        data.map(reason =>
          self.rejectReasonsList.push(
            RejectReasonModel.create(reason),
          ),
        );

        self.rejectReasonsListState = 'done';
      } catch (error) {
        console.error('Failed to fetch projects', error);
        self.rejectReasonsListState = 'error';
      }
    }),
  }));
