import {
  RESTAURATOR_ORDER_MODAL__CLOSE,
  RESTAURATOR_ORDER_MODAL__SET_STATE,
  RESTAURATOR_ORDER_MODAL__OPEN_EDITING,
  RESTAURATOR_ORDER_MODAL__OPEN_CREATION,
  RESTAURATOR_ORDER_MODAL__OPEN_ORDER_ITEM_FOR_EDITING,
  RESTAURATOR_ORDER_MODAL__OPEN_ORDER_ITEM_CREATION_MODAL,
  RESTAURATOR_ORDER_MODAL__TRIGGER_ADD_ITEM_TO_ORDER,
  RESTAURATOR_ORDER_MODAL__UPDATE_ORDER,
  RESTAURATOR_ORDER_MODAL__CREATE_ORDER,
} from './restaurator-order-modal.types';

export const addItemToOrder = () => ({
  type: RESTAURATOR_ORDER_MODAL__TRIGGER_ADD_ITEM_TO_ORDER,
});

export const createOrderFromRestauratorOrderModal = () => ({
  type: RESTAURATOR_ORDER_MODAL__CREATE_ORDER,
});

export const openOrderItemCreationModal = dishId => ({
  type: RESTAURATOR_ORDER_MODAL__OPEN_ORDER_ITEM_CREATION_MODAL,
  payload: { dishId },
});

export const openRestauratorOrderEditingModal = ({ orderId }) => ({
  type: RESTAURATOR_ORDER_MODAL__OPEN_EDITING,
  payload: { orderId },
});

export const openRestauratorOrderCreationModal = () => ({
  type: RESTAURATOR_ORDER_MODAL__OPEN_CREATION,
});

export const setRestauratorOrderModal = payload => ({
  type: RESTAURATOR_ORDER_MODAL__SET_STATE,
  payload,
});

export const openOrderItemForEditing = item => ({
  type: RESTAURATOR_ORDER_MODAL__OPEN_ORDER_ITEM_FOR_EDITING,
  payload: { item },
});

export const closeRestauratorOrderModal = () => ({
  type: RESTAURATOR_ORDER_MODAL__CLOSE,
});

export const triggerOrderUpdating = () => ({
  type: RESTAURATOR_ORDER_MODAL__UPDATE_ORDER,
});
