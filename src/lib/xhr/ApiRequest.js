export default class ApiRequest {
  implementor = null;

  verb = null;

  address = null;

  body = null;

  headers = {};

  queries = {};

  allowsDefaultSuccess = true;

  allowsDefaultFailure = true;

  allowsDefaultError = true;

  allowsSpinner = true;

  callbacks = {
    success: [],
    failure: [],
    error: []
  };

  constructor(address, body = null) {
    this.address = address;
    this.body = body;
  }

  setHeader = (key, value) => {
    this.headers[key] = value;
    return this;
  };

  setHeaders = headers => {
    this.headers = headers;
    return this;
  };

  setQuery = (key, value) => {
    this.queries[key] = value;
    return this;
  };

  setQueries = queries => {
    this.queries = queries;
    return this;
  };

  preventDefaultSuccess = () => {
    this.allowsDefaultSuccess = false;
    return this;
  };

  preventDefaultFailure = () => {
    this.allowsDefaultFailure = false;
    return this;
  };

  preventDefaultError = () => {
    this.allowsDefaultError = false;
    return this;
  };

  preventSpinner = () => {
    this.allowsSpinner = false;
    return this;
  };

  success = callback => {
    this.callbacks.success.push(callback);
    return this;
  };

  failure = callback => {
    this.callbacks.failure.push(callback);
    return this;
  };

  error = callback => {
    this.callbacks.error.push(callback);
    return this;
  };

  go = () => {
    this.implementor.execute(this);
  };
}
