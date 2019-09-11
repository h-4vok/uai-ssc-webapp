import ApiRequestFactory from './ApiRequestFactory';
import SuperagentApiImplementor from './SuperagentApiImplementor';
import ApiResponseImplementor from './ApiResponseImplementor';

// We only want to export the following classes from this package
import HttpVerbs from './HttpVerbs';
import ApiRequest from './ApiRequest';

export class API {
  constructor(notifier) {
    // Default dependencies to handle responses, API calls and our API abstraction served as a singleton
    const responseImplementor = new ApiResponseImplementor(notifier);
    const apiImplementor = new SuperagentApiImplementor(responseImplementor);
    this.request = new ApiRequestFactory(
      apiImplementor,
      'http://localhost:50257/api/'
    );
  }
}

export { HttpVerbs, ApiRequest };
