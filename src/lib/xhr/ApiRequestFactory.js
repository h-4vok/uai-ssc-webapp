import HttpVerbs from './HttpVerbs';
import ApiRequest from './ApiRequest';

export default class ApiRequestFactory {
  constructor(implementor, defaultRoot = null) {
    this.implementor = implementor;
    this.defaultRoot = defaultRoot;
  }

  setupReq = (req, verb) => {
    req.implementor = this.implementor;
    req.verb = verb;
  };

  setupRoute = route => {
    const completeRoute = `${this.defaultRoot}${route}`;
    return completeRoute;
  };

  concatId = (address, id) => {
    address = `${address}/${id}`;
    return address;
  };

  get = address => {
    address = this.setupRoute(address);

    const req = new ApiRequest(address);
    this.setupReq(req, HttpVerbs.get);

    return req;
  };

  getById = (address, id = '') => {
    address = this.concatId(address, id);
    address = this.setupRoute(address);

    const req = new ApiRequest(address);
    this.setupReq(req, HttpVerbs.get);

    return req;
  };

  buildRequest = (verb, address, body = null) => {
    address = this.setupRoute(address);

    const req = new ApiRequest(address, body);
    this.setupReq(req, verb);

    return req;
  };

  post = (address, body) => this.buildRequest(HttpVerbs.post, address, body);

  put = (address, body, id) => {
    address = this.concatId(address, id);

    return this.buildRequest(HttpVerbs.put, address, body);
  };

  del = (address, id) => {
    address = this.concatId(address, id);

    return this.buildRequest(HttpVerbs.del, address);
  };

  patch = (address, body, id) => {
    address = this.concatId(address, id);

    return this.buildRequest(HttpVerbs.patch, address, body);
  };
}
