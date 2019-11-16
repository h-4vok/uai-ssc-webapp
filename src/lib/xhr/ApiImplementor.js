import uuidv4 from 'uuid/v4';

/* eslint-disable no-console */
/* This class has DEV environment specific code so we need console.log */

export default class ApiImplementor {
  constructor(responseImplementor) {
    this.responseImplementor = responseImplementor;
  }

  logValue = (key, value) => console.log(`${key} - ${value}`);

  logSeparator = () => console.log('###############################');

  execute(req) {
    req.identity = uuidv4();

    // if (!process.env.REACT_APP_DEBUG_API) return;

    // this.logSeparator();
    // console.log(`Executing API request - ${req.identity}`);
    // this.logSeparator();
    // this.logValue('verb', req.verb);
    // console.log({ headers: req.headers });
    // this.logValue('address', req.address);
    // console.log({ body: req.body });
    // this.logValue('allowsDefaultSuccess', req.allowsDefaultSuccess);
    // this.logValue('allowsDefaultFailure', req.allowsDefaultFailure);
    // this.logValue('allowsDefaultError', req.allowsDefaultError);
    // this.logValue('success callbacks #', req.callbacks.success.length);
    // this.logValue('failure callbacks #', req.callbacks.failure.length);
    // this.logValue('error callbacks #', req.callbacks.error.length);
    // console.log('');
    // this.logSeparator();
    // console.log('');
  }
}
