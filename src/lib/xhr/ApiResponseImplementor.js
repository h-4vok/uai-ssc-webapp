/* eslint-disable complexity */
import HttpVerbs from './HttpVerbs';
import { GlobalState } from '../GlobalState';

const checkIsSuccess = res => expected =>
  res && res.body && res.body.IsSuccess === expected;
const isFailure = res => checkIsSuccess(res)(false);
const isSuccess = res => checkIsSuccess(res)(true);

export default class ApiResponseImplementor {
  constructor(notifier) {
    this.notifier = notifier;
  }

  handleResponse = (req, err, res) => {
    // Response example
    // {
    //   "status": "Success" | "Error",
    //   "result": {} | ""
    // }

    if (err) {
      this.handleResponseError(req, err, res);
      return;
    }

    if (isFailure(res)) {
      this.handleResponseFailure(req, err, res);
    } else if (isSuccess(res)) {
      this.handleResponseSuccess(req, res);
    }
  };

  handleResponseSuccess = (req, res) => {
    if (req.allowsDefaultSuccess && req.verb !== HttpVerbs.get) {
      this.notifier.success();
    }

    req.callbacks.success.forEach(callback => callback(res));
  };

  handleResponseFailure = (req, err, res) => {
    if (req.allowsDefaultFailure) {
      const errMessage = res && res.body ? res.body.ErrorMessage : null;

      this.notifier.error(errMessage);
    }

    req.callbacks.failure.forEach(callback => callback(res));
  };

  handleResponseError = (req, err, res) => {
    const resultIsUnauthorized = () => res && res.status === 401;
    const canUseGlobalHistory = () => !!GlobalState.History;

    if (req.allowsDefaultError) {
      if (resultIsUnauthorized()) {
        this.notifier.error('Su sesión ha expirado.');

        if (canUseGlobalHistory()) {
          GlobalState.History.push('/sign-in');
        } else {
          window.location.href = `http://${window.location.hostname}:${window.location.port}/#/sign-in`;
        }
      } else {
        this.notifier.error();
      }
    }

    req.callbacks.error.forEach(callback => callback(err, res));
  };
}
