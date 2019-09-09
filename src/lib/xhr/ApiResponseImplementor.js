/* eslint-disable complexity */
import HttpVerbs from './HttpVerbs';

const isResponseError = err => err && err.status >= 500;
const isResponseSuccess = res =>
  [200, 201, 204].some(status => res.status === status);

export default class ApiResponseImplementor {
  constructor(notifierImplementor) {
    this.notifierImplementor = notifierImplementor;
  }

  handleResponse = (req, err, res) => {
    // Response example
    // {
    //   "status": "Success" | "Error",
    //   "result": {} | ""
    // }

    if (err && !res) {
      this.handleResponseError(req, err);
      return;
    }

    if (isResponseSuccess(res)) {
      this.handleResponseSuccess(req, res);
    } else if (isResponseError(err)) {
      this.handleResponseError(req, err, res);
    } else {
      this.handleResponseFailure(req, err, res);
    }
  };

  handleResponseSuccess = (req, res) => {
    if (req.allowsDefaultSuccess && req.verb !== HttpVerbs.get) {
      this.notifierImplementor.handleOperationSuccess();
    }

    req.callbacks.success.forEach(callback => callback(res));
  };

  handleResponseFailure = (req, err, res) => {
    if (req.allowsDefaultFailure) {
      const errMessage = res && res.body ? res.body.result : null;

      this.notifierImplementor.handleResponseFailure(errMessage);
    }

    req.callbacks.failure.forEach(callback => callback(res));
  };

  handleResponseNull = (req, err) => {
    if (req.allowsDefaultError) {
      this.notifierImplementor.handleResponseError(req, err, null);
    }

    req.callbacks.error.forEach(callback => callback(err, null));
  };

  handleResponseError = (req, err, res) => {
    if (req.allowsDefaultError) {
      this.notifierImplementor.handleResponseError(req, err, res);
    }

    req.callbacks.error.forEach(callback => callback(err, res));
  };
}
