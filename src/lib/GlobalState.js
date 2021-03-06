import superagent from 'superagent';
import { SpinnerService } from './SpinnerService';
import { Authorizer } from './Authorizer';
import { UserSessionService } from './UserSessionService';

export const GlobalState = {
  SpinnerService: new SpinnerService(),
  Authorizer,
  AspNetSession: '',
  Superagent: superagent.agent(),
  History: null,
  SiteTheme: null,
  AppComponent: null,
  UserSessionService,
  getI10n: () => GlobalState.AppComponent.state.i10n,
  fromI10n: key => GlobalState.getI10n()[key]
};

export const { fromI10n } = GlobalState;
