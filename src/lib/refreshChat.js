import { API } from './xhr';
import { GlobalState } from './GlobalState';
import { scrollChatboxDown } from './scrollChatboxDown';

export function refreshChat() {
  const userId = GlobalState.UserSessionService.getUserId();
  if (!userId) return;

  const api = new API();

  api.request
    .getById('platformchat', userId)
    .preventDefaultError()
    .preventDefaultFailure()
    .preventDefaultSuccess()
    .preventSpinner()
    .success(res =>
      GlobalState.AppComponent.updateChatConversation({
        Messages: res.body.Result
      })
    )
    .success(scrollChatboxDown)
    .go();
}
