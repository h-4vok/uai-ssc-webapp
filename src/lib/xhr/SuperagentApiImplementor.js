import superagent from 'superagent';
import Apiimplementor from './ApiImplementor';
import HttpVerbs from './HttpVerbs';

export default class SuperagentApiImplementor extends Apiimplementor {
  constructor(responseImplementor) {
    super(responseImplementor);

    this.handlers = {
      [HttpVerbs.get]: this.get,
      [HttpVerbs.post]: this.post,
      [HttpVerbs.put]: this.put,
      [HttpVerbs.patch]: this.patch,
      [HttpVerbs.del]: this.del
    };
  }

  execute = req => {
    super.execute(req);

    const closure = this.handlers[req.verb];
    closure(req);
  };

  get = req => {
    superagent
      .get(req.address)
      .set(req.headers)
      .query(req.queries)
      .end((err, res) =>
        this.responseImplementor.handleResponse(req, err, res)
      );
  };

  del = req => {
    superagent
      .del(req.address)
      .set(req.headers)
      .query(req.queries)
      .end((err, res) =>
        this.responseImplementor.handleResponse(req, err, res)
      );
  };

  post = req => {
    superagent
      .post(req.address)
      .set(req.headers)
      .send(req.body)
      .end((err, res) =>
        this.responseImplementor.handleResponse(req, err, res)
      );
  };

  put = req => {
    superagent
      .put(req.address)
      .set(req.headers)
      .send(req.body)
      .end((err, res) =>
        this.responseImplementor.handleResponse(req, err, res)
      );
  };

  patch = req => {
    superagent
      .patch(req.address)
      .set(req.headers)
      .send(req.body)
      .end((err, res) =>
        this.responseImplementor.handleResponse(req, err, res)
      );
  };
}
