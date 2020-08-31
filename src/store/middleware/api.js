import { ApiService, MockApiService } from '../../services';
import { makeApiRequest, logRequest } from '../../modules/core';
import { showToast } from '../../scenes/Toasts/modules';
import { ApiResponseService } from '../../services/ApiResponseService/ApiResponseService';

export const CALL_API = 'api-request';
export const PUT_API_REQUEST_IN_REGISTRY = 'put-api-request-in-registry';

export default store => next => action => {
  if (action.type !== CALL_API) {
    return next(action);
  }

  const { request } = action;

  const {
    types: [requestType, successType, errorType],
    responseConverter = response => response,
    body,
    mock,
    logger,
    ...rest
  } = request;

  const successRequest = response => {
    if (request.logger) {
      store.dispatch(logRequest({ request, response, type: 'success' }));
    }

    if (successType) {
      return next({
        response: responseConverter(response),
        body,
        type: successType,
        ...rest,
      });
    }
  };

  const errorRequest = response => {
    const clientErrorLog = request.logger && request.logger.error;
    const responseErrorLog = ApiResponseService.error(response);
    const errorTxt = responseErrorLog || clientErrorLog;

    if (errorTxt) {
      store.dispatch(showToast({ text: errorTxt, type: 'error' }));
    }

    if (request.logger) {
      store.dispatch(logRequest({ request, response, type: 'error' }));
    }

    if (errorType) {
      return next({
        error: response,
        body,
        ...rest,
        type: errorType,
      });
    }
  };

  store.dispatch(makeApiRequest({ type: requestType, body, ...rest }));

  const methodKey = request.method.toLowerCase();
  const apiRequest = mock
    ? MockApiService[methodKey](mock)
    : ApiService[methodKey](request);

  store.dispatch({
    type: PUT_API_REQUEST_IN_REGISTRY,
    requestType,
    xhr: apiRequest.xhr,
  });

  apiRequest.promise.then(successRequest, errorRequest);

  return apiRequest;
};
