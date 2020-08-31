import { API_REQUESTS_ABORT } from '../../modules/core/core.types';
import { PUT_API_REQUEST_IN_REGISTRY, CALL_API } from './api';
import { GET_RESTAURANTS_LIST_REQUEST } from '../../modules/restaurants';

const appRequestsRegistry = {};
const forceAbortRequestsRegistry = [GET_RESTAURANTS_LIST_REQUEST];

export default () => next => action => {
  switch (action.type) {
    case CALL_API: {
      const requestType = action.request.types[0];
      if (forceAbortRequestsRegistry.includes(requestType)) {
        appRequestsRegistry[requestType] &&
          appRequestsRegistry[requestType].abort();
      }
      break;
    }

    case PUT_API_REQUEST_IN_REGISTRY: {
      appRequestsRegistry[action.requestType] = action.xhr;
      break;
    }

    case API_REQUESTS_ABORT: {
      action.requestTypes.forEach(requestType => {
        appRequestsRegistry[requestType] &&
          appRequestsRegistry[requestType].abort();
      });
      break;
    }

    default: {
      return next(action);
    }
  }

  return next(action);
};
