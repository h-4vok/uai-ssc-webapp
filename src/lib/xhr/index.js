import ApiRequestFactory from './ApiRequestFactory';
import SuperagentApiImplementor from './SuperagentApiImplementor';
import ApiResponseNotifier from './ApiResponseNotifier';
import ApiResponseImplementor from './ApiResponseImplementor';

// We only want to export the following classes from this package
import HttpVerbs from './HttpVerbs';
import ApiRequest from './ApiRequest';

class API {
  constructor(notifier) {
    // Default dependencies to handle responses, API calls and our API abstraction served as a singleton
    const responseNotifier = new ApiResponseNotifier(notifier);
    const responseImplementor = new ApiResponseImplementor(responseNotifier);
    const apiImplementor = new SuperagentApiImplementor(responseImplementor);
    this.request = new ApiRequestFactory(
      apiImplementor,
      'http://localhost:50257/api/'
    );
  }
}

// As a default from index.js we export a singleton named "api"
export default API;
export { HttpVerbs, ApiRequest };
