import { CALL_API } from '.';

export default () => next => action => {
  if (action.type !== CALL_API) {
    return next(action);
  }

  const { request } = action;
  const { urlParams } = request;

  if (urlParams) {
    Object.keys(urlParams).forEach(key => {
      request.endpoint = request.endpoint.replace(`{${key}}`, urlParams[key]);
    });
  }

  if (!request.contentType) {
    request.contentType = 'application/json';
  }

  return next(action);
};
