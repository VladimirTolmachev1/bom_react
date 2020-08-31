import { LOG_REQUEST } from '/modules/core';
import { ApiResponseService } from '/services';
import { showToast } from '/scenes/Toasts/modules';

export default store => next => action => {
  if (action.type !== LOG_REQUEST) {
    next(action);
  }

  const {
    request: { logger },
    response,
    type,
  } = action;
  const clientLog = logger && logger[type];
  const responseLog = ApiResponseService[type](response);
  const text = responseLog || clientLog;

  if (text) {
    store.dispatch(showToast({ text, type }));
  }
};
