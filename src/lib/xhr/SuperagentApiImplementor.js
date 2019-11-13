import Apiimplementor from './ApiImplementor';
import HttpVerbs from './HttpVerbs';
import { GlobalState } from '../GlobalState';

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
    if (req.allowsSpinner) GlobalState.SpinnerService.up();

    super.execute(req);

    const closure = this.handlers[req.verb];
    closure(req);
  };

  templateExec = (req, superagentReq) => {
    superagentReq
      .withCredentials()
      .set(req.headers)
      .query(req.queries)
      .end((err, res) => {
        this.responseImplementor.handleResponse(req, err, res);
        if (req.allowsSpinner) GlobalState.SpinnerService.down();
      });
  };

  get = req => this.templateExec(req, GlobalState.Superagent.get(req.address));

  del = req => this.templateExec(req, GlobalState.Superagent.del(req.address));

  post = req =>
    this.templateExec(
      req,
      GlobalState.Superagent.post(req.address).send(req.body)
    );

  put = req =>
    this.templateExec(
      req,
      GlobalState.Superagent.put(req.address).send(req.body)
    );

  patch = req =>
    this.templateExec(
      req,
      GlobalState.Superagent.patch(req.address).send(req.body)
    );
}
