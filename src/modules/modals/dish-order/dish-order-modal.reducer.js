import {
  OPEN_DISH_ORDER_MODAL,
  DISH_ORDER_MODAL__CLOSE,
  DISH_ORDER_MODAL__SET_STATE,
} from './dish-order-modal.types';

const getInitialState = () => ({
  open: false,
  id: null,
  isEditing: false,
  isLoading: false,
});

export function dishOrderModalReducer(
  state = getInitialState(),
  { type, payload },
) {
  switch (type) {
    case OPEN_DISH_ORDER_MODAL: {
      return {
        ...state,
        ...payload,
        id: payload.id,
        open: true,
      };
    }

    case DISH_ORDER_MODAL__SET_STATE: {
      return {
        ...state,
        ...payload,
      };
    }

    case DISH_ORDER_MODAL__CLOSE: {
      return getInitialState();
    }

    default:
      return state;
  }
}
