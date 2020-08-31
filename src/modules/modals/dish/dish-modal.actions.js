import {
  DISH_MODAL__SET_STATE,
  DISH_MODAL__FULLY_CLEAR,
  DISH_MODAL__CREATE,
  DISH_MODAL__UPDATE_INFO,
  DISH_MODAL__RESET_FORMS,
  DISH_MODAL__PATCH_EXTRAS,
  DISH_MODAL__PATCH_SIZES,
} from './dish-modal.types';

import { createActionCreator } from '../../../helpers';

export const setDishModal = createActionCreator(DISH_MODAL__SET_STATE);

export const clearDishModal = () => ({ type: DISH_MODAL__FULLY_CLEAR });

export const resetDishModalForms = () => ({ type: DISH_MODAL__RESET_FORMS });

export const updateDishFromModal = () => ({
  type: DISH_MODAL__UPDATE_INFO,
});

export const createDishFromModal = () => ({
  type: DISH_MODAL__CREATE,
});

export const patchDishExtrasFromModal = () => ({
  type: DISH_MODAL__PATCH_EXTRAS,
});

export const patchDishSizesFromModal = () => ({
  type: DISH_MODAL__PATCH_SIZES,
});
