import { API } from './xhr';
import { GlobalState } from './GlobalState';

export function refreshAdminChat() {
  const api = new API();

  api.request
    .get('platformchat')
    .preventDefaultError()
    .preventDefaultFailure()
    .preventDefaultSuccess()
    .preventSpinner()
    .success(res => {
      if (!res.body.Result) {
        GlobalState.AppComponent.updateAdminChatNotifications(0);
        return;
      }

      let sum = 0;
      res.body.Result.forEach(item => (sum += item.PendingCount));

      GlobalState.AppComponent.updateAdminChatNotifications(sum);
    })
    .go();
}
