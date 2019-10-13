import superagent from 'superagent';
import { SpinnerService } from './SpinnerService';
import { Authorizer } from './Authorizer';

export const GlobalState = {
  SpinnerService: new SpinnerService(),
  Authorizer,
  AspNetSession: '',
  Superagent: superagent.agent(),
  History: null,
  SiteTheme: null,
  AppComponent: null
};
