import HttpVerbs from './HttpVerbs';

export default class ApiResponseNotifier {
  constructor(notifier) {
    this.notifier = notifier;
  }

  handleResponse = (req, err, res) => {
    if (err && !res) {
      this.handleResponseError(req, err);
      return;
    }

    if (res.status >= 400 && res.status <= 499) {
      this.handleResponseFailure(req, err, res);
    } else if (res.status >= 500) {
      this.handleResponseError(req, err, res);
    }

    this.handleResponseSuccess(req, res);
  };

  handleResponseSuccess = (req, res) => {
    if (req.allowsDefaultSuccess && req.verb !== HttpVerbs.get) {
      this.notifier.success();
    }

    req.callbacks.success.forEach(callback => callback(res));
  };

  handleResponseFailure = (req, err, res) => {
    if (req.allowsDefaultFailure) {
      const errMessage = null;

      this.notifier.error(errMessage);
    }

    req.callbacks.failure.forEach(callback => callback(res));
  };

  handleResponseError = (req, err, res) => {
    if (req.allowsDefaultError) {
      const errorMessage = err.message;

      this.notifier.error(errorMessage);
    }

    req.callbacks.error.forEach(callback => callback(err, res));
  };
}
