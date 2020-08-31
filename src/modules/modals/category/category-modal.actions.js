import {
  CATEGORY_MODAL__SET_STATE,
  CATEGORY_MODAL__FULLY_CLEAR,
  CATEGORY_MODAL__CREATE,
  CATEGORY_MODAL__UPDATE_INFO,
  CATEGORY_MODAL__RESET_FORMS,
  CATEGORY_MODAL__PATCH_EXTRAS,
} from './category-modal.types';

import { createActionCreator } from '../../../helpers';

export const setCategoryModal = createActionCreator(CATEGORY_MODAL__SET_STATE);

export const clearCategoryModal = () => ({ type: CATEGORY_MODAL__FULLY_CLEAR });

export const resetCategoryModalForms = () => ({
  type: CATEGORY_MODAL__RESET_FORMS,
});

export const updateCategoryFromModal = () => ({
  type: CATEGORY_MODAL__UPDATE_INFO,
});

export const createCategoryFromModal = () => ({
  type: CATEGORY_MODAL__CREATE,
});

export const patchCategoryExtrasFromModal = () => ({
  type: CATEGORY_MODAL__PATCH_EXTRAS,
});
