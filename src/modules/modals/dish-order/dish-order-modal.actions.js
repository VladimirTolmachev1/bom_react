import {
  DISH_ORDER_MODAL__CLOSE,
  DISH_ORDER_MODAL__SET_STATE,
  DISH_ORDER_MODAL__TRIGGER_PUT_ITEM_TO_CHECKOUT,
  DISH_ORDER_MODAL__TRIGGER_UPDATING_CHECKOUT_ITEM,
} from './dish-order-modal.types';

export const setDishOrderModal = payload => ({
  type: DISH_ORDER_MODAL__SET_STATE,
  payload,
});

export const closeDishOrderModal = () => ({
  type: DISH_ORDER_MODAL__CLOSE,
});

export const triggerPutItemToCheckout = () => ({
  type: DISH_ORDER_MODAL__TRIGGER_PUT_ITEM_TO_CHECKOUT,
});
export const triggerUpdatingCheckoutItem = () => ({
  type: DISH_ORDER_MODAL__TRIGGER_UPDATING_CHECKOUT_ITEM,
});
