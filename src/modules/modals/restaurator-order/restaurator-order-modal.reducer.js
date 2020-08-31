import { orderModalStepValues } from './restaurator-order-modal.utils';

import {
  RESTAURATOR_ORDER_MODAL__SET_STATE,
  RESTAURATOR_ORDER_MODAL__CLOSE,
  RESTAURATOR_ORDER_MODAL__OPEN_EDITING,
  RESTAURATOR_ORDER_MODAL__OPEN_CREATION,
} from './restaurator-order-modal.types';

const getInitialState = () => ({
  open: false,
  step: orderModalStepValues.ORDER_ITEMS,
  isEditing: false,
  orderId: null,
  activeOrderItemId: null,
});

export function restauratorOrderModalReducer(
  state = getInitialState(),
  { type, payload },
) {
  switch (type) {
    case RESTAURATOR_ORDER_MODAL__SET_STATE: {
      return {
        ...state,
        ...payload,
      };
    }

    case RESTAURATOR_ORDER_MODAL__OPEN_CREATION: {
      return {
        ...state,
        open: true,
      };
    }

    case RESTAURATOR_ORDER_MODAL__OPEN_EDITING: {
      return {
        ...state,
        isEditing: true,
        orderId: payload.orderId,
        open: true,
      };
    }

    case RESTAURATOR_ORDER_MODAL__CLOSE: {
      return getInitialState();
    }

    default:
      return state;
  }
}
