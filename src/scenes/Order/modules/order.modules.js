import { ReduxCrudService } from '../../../services';
import { API_REQUESTS_ABORT } from '../../../modules/core';
import {
  CREATE_CHARGE_REQUEST,
  CREATE_CHARGE_SUCCESS,
  CREATE_CHARGE_ERROR,
} from '../../Checkout/modules';

export const resource = '/order';

export const getInitialState = () => ({
  loadingCreateOrder: false,
  error: null,
});

export const {
  POST: [CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_ERROR],
} = ReduxCrudService.getActionCrudTypes(resource);

export const reducer = {
  name: resource,
  [resource](state = getInitialState(), action = {}) {
    switch (action.type) {
      case CREATE_CHARGE_REQUEST:
      case CREATE_ORDER_REQUEST: {
        return {
          ...state,
          loadingCreateOrder: true,
        };
      }

      case CREATE_CHARGE_SUCCESS:
      case CREATE_ORDER_SUCCESS: {
        return {
          ...state,
          loadingCreateOrder: false,
        };
      }

      case CREATE_CHARGE_ERROR:
      case CREATE_ORDER_ERROR: {
        return {
          ...state,
          loadingCreateOrder: false,
        };
      }

      default: {
        return state;
      }
    }
  },
};

export const createOrder = ReduxCrudService.resourceAction({
  resource,
  method: 'POST',
  logger: {
    success: 'Order was successful created',
    error: 'Error during order creation',
  },
});

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [CREATE_ORDER_REQUEST],
  };
}
