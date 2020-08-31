import { SIGN_IN_SUCCESS, SIGN_OUT, getDictionaries } from '../../modules/core';
import { HelperService } from '../../services';

export default store => next => action => {
  switch (action.type) {
    case SIGN_IN_SUCCESS: {
      HelperService.setInStorage(localStorage, 'token', action.response.token);
      store.dispatch(getDictionaries());
      return next(action);
    }

    case SIGN_OUT: {
      HelperService.popFromStorage(localStorage, 'token');

      return next(action);
    }

    default: {
      return next(action);
    }
  }
};
