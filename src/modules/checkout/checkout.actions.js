import { ReduxCrudService } from '../../services';
import {
  chargeResource,
  CHECKOUT__PUT_ITEM,
  CHECKOUT__CREATE_NEW_ITEM,
  CHECKOUT__UPDATE_ITEM,
  CHECKOUT__INCREASE_ITEM_AMOUNT,
  CHECKOUT__REMOVE_ITEM,
  CHECKOUT__CLEAR,
  CHECKOUT__SAVE_TO_STORAGE,
  CHECKOUT__CLEAR_FROM_STORAGE,
  CHECKOUT__RESTORE_FROM_STORAGE,
  CHECKOUT__SET_UI,
  CHECKOUT__BACK_TO_RESTAURANT_MENU,
  CHECKOUT__BULK_CREATE_CHECKOUT_ITEMS,
  CHECKOUT__BULK_SAVE,
} from './checkout.types';

export const updateCheckoutItem = payload => ({
  type: CHECKOUT__UPDATE_ITEM,
  payload,
});

export const putItemToCheckout = item => ({
  type: CHECKOUT__PUT_ITEM,
  payload: item,
});

export const bulkCreateCheckoutItems = items => ({
  type: CHECKOUT__BULK_CREATE_CHECKOUT_ITEMS,
  payload: items,
});

export const bulkSaveCheckout = payload => ({
  type: CHECKOUT__BULK_SAVE,
  payload,
});

export const createNewCheckoutItem = item => ({
  type: CHECKOUT__CREATE_NEW_ITEM,
  payload: { ...item },
});

export const removeItemFromCheckout = itemUuid => ({
  type: CHECKOUT__REMOVE_ITEM,
  payload: itemUuid,
});

export const increaseCheckoutItemAmountBy = (uuid, amountToAdd) => ({
  type: CHECKOUT__INCREASE_ITEM_AMOUNT,
  payload: { uuid, amountToAdd },
});

export const clearCheckout = () => ({
  type: CHECKOUT__CLEAR,
});

export const createOrderCharge = ReduxCrudService.resourceAction({
  resource: chargeResource,
  method: 'POST',
});

// LOCAL STORAGE
export const saveCheckoutToStorage = checkout => ({
  type: CHECKOUT__SAVE_TO_STORAGE,
  payload: { checkout },
});

export const clearCheckoutFromStorage = () => ({
  type: CHECKOUT__CLEAR_FROM_STORAGE,
});

export const restoreCheckoutFromStorage = checkout => ({
  type: CHECKOUT__RESTORE_FROM_STORAGE,
  payload: checkout,
});

// UI
export const setCheckoutUi = (popertiesToMerge = {}) => ({
  type: CHECKOUT__SET_UI,
  payload: popertiesToMerge,
});

export const backToRestaurantMenu = restaurantLink => ({
  type: CHECKOUT__BACK_TO_RESTAURANT_MENU,
  payload: { restaurantLink },
});
